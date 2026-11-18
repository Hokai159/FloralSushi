-- Liste des administrateurs : seuls ces comptes peuvent voir et modifier les commandes.
-- À exécuter une fois dans Supabase (SQL Editor). Les deux administrateurs sont déjà renseignés.

create table if not exists admins (
  email text primary key
);
alter table admins enable row level security;

-- Chaque compte ne peut voir que sa propre ligne (c'est ainsi que la page admin vérifie l'accès)
drop policy if exists "admin : voir son statut" on admins;
create policy "admin : voir son statut" on admins
  for select to authenticated
  using (email = auth.jwt() ->> 'email');

insert into admins (email) values
  ('benjaminpedrak@gmail.com'),
  ('pedrak.buy@gmail.com')
on conflict do nothing;

-- Les anciennes règles basées sur une liste d'emails sont remplacées par la table admins
drop policy if exists "lecture staff" on orders;
drop policy if exists "mise à jour staff" on orders;

create policy "lecture admin" on orders
  for select to authenticated
  using (exists (select 1 from admins where email = auth.jwt() ->> 'email'));

create policy "mise à jour admin" on orders
  for update to authenticated
  using (exists (select 1 from admins where email = auth.jwt() ->> 'email'));
