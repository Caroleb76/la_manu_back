export function generateRandomPassword(){
    const generated = Math.random().toString(36).slice(-8);
    return generated
}