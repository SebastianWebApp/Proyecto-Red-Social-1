import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'; // Importamos el módulo 'crypto' para cifrado y descifrado
import dotenv from "dotenv";

dotenv.config();

// Generamos una clave secreta de 32 bytes para AES-256 (cifrado de 256 bits)
const claveSecreta = Buffer.from(process.env.CLAVE_SECRETA_CRYPTO, 'hex');
 
// Generamos un vector de inicialización (IV) de 16 bytes. Esto añade aleatoriedad al cifrado
const iv = randomBytes(16); 

// Función para encriptar un texto
export function Encriptar(texto) {
    
    // Creamos un cifrador con el algoritmo AES-256-CBC, clave secreta y vector de inicialización
    const cifrador = createCipheriv('aes-256-cbc', claveSecreta, iv);
    
    // Ciframos el texto. 'utf8' indica el formato del texto original, y 'hex' el formato del resultado
    let encriptado = cifrador.update(texto, 'utf8', 'hex');
    
    // Finalizamos el cifrado y añadimos cualquier dato restante al resultado
    encriptado += cifrador.final('hex');
    
    // Retornamos el texto cifrado junto con el IV necesario para descifrarlo después
    return {
        iv: iv.toString('hex'), // Convertimos el IV a una cadena hexadecimal para almacenarlo fácilmente
        encriptado: encriptado, // Texto cifrado en formato hexadecimal
    };
}

// Función para desencriptar un texto cifrado
export function Desencriptar(datoEncriptado) {
    
    // Creamos un descifrador con el mismo algoritmo, clave secreta y el IV usado en el cifrado
    const descifrador = createDecipheriv(
        'aes-256-cbc',                      // Algoritmo usado (AES-256-CBC)
        claveSecreta,                       // Clave secreta para descifrar
        Buffer.from(datoEncriptado.iv, 'hex') // Convertimos el IV desde formato hexadecimal a un buffer
    );
    
    // Desciframos el texto. 'hex' indica el formato del texto cifrado, y 'utf8' el formato del texto original
    let desencriptado = descifrador.update(datoEncriptado.encriptado, 'hex', 'utf8');
    
    // Finalizamos el descifrado y añadimos cualquier dato restante al resultado
    desencriptado += descifrador.final('utf8');
    
    // Retornamos el texto original descifrado
    return desencriptado;
}
