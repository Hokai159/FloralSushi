export function offerItems(b) {
  const out = [];
  if (b.baguettes) out.push({label:`${b.baguettes} paire${b.baguettes>1?"s":""} de baguettes à sushi offerte${b.baguettes>1?"s":""}`, note:`Incluse${b.baguettes>1?"s":""} avec votre ${b.name}`});
  if (b.sauces) out.push({label:`${b.sauces} sauce${b.sauces>1?"s":""} offerte${b.sauces>1?"s":""} (sucrée ou salée)`, note:`Incluse${b.sauces>1?"s":""} avec votre ${b.name}`});
  return out;
}
