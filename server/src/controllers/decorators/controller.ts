import { AppRouter } from "../../AppRouter";
import { Methods, MetadataKeys } from "./enums";
import { Handler } from "express";

export function controller(routePrefix: string) {
    return function(target: Function) {
        const router = AppRouter.getInstance();
        console.log(target.prototype);
        
        for (let key in target.prototype) {
            const routeHandler: Handler = target.prototype[key];
            const path: string = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key);
            const method: Methods = Reflect.getMetadata(MetadataKeys.METHOD, target.prototype, key);

            if (path) {
                router[method](`${routePrefix}${path}`, routeHandler);
            }
        }
    }
}
