import express from 'express';
// Se dio el nombre 'el_router' porque los elementos brindados 
// por defecto, tienen la propiedad de al ser llamados desde 
// otro archivo usando cualquier nombre.
import el_router from '../routes/product.routes';
import el_user from '../routes/user.routes';
import { Product } from './product';
import { Cliente } from './cliente';
import cors from 'cors';

export class Server 
{

    private app: express.Application;
    private port: string;

    constructor()
    {
        console.log('Server initialized');
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        // Middleware va antes de usar rutas el 100% de los casos.
        this.middleware()
        this.routes();
        this.dbConnect()
    }

    listen()
    {
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port); 
        });
    }

    routes()
    {
        this.app.use('/api/products', el_router);
        this.app.use('/api/users', el_user);
    }

    // Sin el middleware los envíos de archivos Json no pueden ser
    // traspasados.
    middleware()
    {
        this.app.use(express.json());
        this.app.use(cors())
    }

    async dbConnect()
    {
        try 
        {
            // Según la documentación, utilizar el método sync corresponde a crear la instancia en la base de datos.
            // En el caso de que la instancia ya exista, la solicitud es ignorada.
            await Product.sync()
            console.log('Se pudo crear apropiadamente la tabla "Productos" en la base de datos.');

            await Cliente.sync()
            console.log('Se pudo crear apropiadamente la tabla "Cliente" en la base de datos');
        }

        catch (err) {
            console.log('Fue imposible conectarse, el error fue: ' + err);
        }
    }

}