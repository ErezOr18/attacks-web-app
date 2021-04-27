import { NextFunction } from 'express';
import { Response } from 'express';
import { Request } from 'express';
import { PaginationAwareObject } from "./helpers/pagination";
declare module "typeorm" {
    interface SelectQueryBuilder<Entity> {
        paginate(per_page?: number | null): Promise<PaginationAwareObject>;
    }
}
/**
 * Boot the package by patching the SelectQueryBuilder
 *
 */
export declare function pagination(req: Request, res: Response, next: NextFunction): void;
export declare function getPerPage(req: Request, defaultPerPage?: number): number;
export declare function getPage(req: Request, defaultPage?: number): number;
