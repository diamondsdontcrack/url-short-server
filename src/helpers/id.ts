const ID_CHARACTEER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export function generateRandomId(): string {

  const length: number = 5 + Math.floor(Math.random() * 4)
  let id = ""

  for (let i = 0; i < length; i++)
  {
    id = id + ID_CHARACTEER_SET[Math.floor(Math.random() * ID_CHARACTEER_SET.length)]
  }
  return id;
}

export function validateCustomId(id: string): boolean {

  for (let i = 0; i < id.length; i++) {
    if (!ID_CHARACTEER_SET.includes(id[i])){
      return false
    }
  }
  
  return true
}