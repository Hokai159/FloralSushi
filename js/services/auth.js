export async function hashPwd(email, pwd) {
  const data = new TextEncoder().encode("fs|" + email.toLowerCase() + "|" + pwd);
  if (window.crypto && crypto.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
  }
  let h = 5381; for (const b of data) h = ((h * 33) ^ b) >>> 0;   // repli si le navigateur bloque le chiffrement
  return "djb2-" + h.toString(16);
}
