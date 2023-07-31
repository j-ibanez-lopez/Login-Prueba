"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
// Se dio el nombre 'el_router' porque los elementos brindados 
// por defecto, tienen la propiedad de al ser llamados desde 
// otro archivo usando cualquier nombre.
const product_routes_1 = __importDefault(require("../routes/product.routes"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const product_1 = require("./product");
const cliente_1 = require("./cliente");
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        console.log('Server initialized');
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.listen();
        // Middleware va antes de usar rutas el 100% de los casos.
        this.middleware();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/products', product_routes_1.default);
        this.app.use('/api/users', user_routes_1.default);
    }
    // Sin el middleware los envíos de archivos Json no pueden ser
    // traspasados.
    middleware() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Según la documentación, utilizar el método sync corresponde a crear la instancia en la base de datos.
                // En el caso de que la instancia ya exista, la solicitud es ignorada.
                yield product_1.Product.sync();
                console.log('Se pudo crear apropiadamente la tabla "Productos" en la base de datos.');
                yield cliente_1.Cliente.sync();
                console.log('Se pudo crear apropiadamente la tabla "Cliente" en la base de datos');
            }
            catch (err) {
                console.log('Fue imposible conectarse, el error fue: ' + err);
            }
        });
    }
}
exports.Server = Server;
