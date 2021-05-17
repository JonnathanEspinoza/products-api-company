import { Promise } from "mongoose";
import Role from "../models/Role";

// crear los roles en la base de datos
export const createRoles = async () => {
    try {
        // verifica si en el modelo Role hay documentos
        // devuelve el numero de documentos creados
        const count = await Role.estimatedDocumentCount();

        // si el count es mayor, significa que hay documentos creados
        if (count > 0) return;

        // promesa para ejecutar todas las funciones al mismo tiempo
        // dentro de la promesa se crean los roles
        const values = await Promise.all([
            new Role({ name: "user" }).save(),
            new Role({ name: "moderator" }).save(),
            new Role({ name: "admin" }).save()
        ]);
        
        console.log(values);

    } catch (error) {
        console.error(error);
    }
}