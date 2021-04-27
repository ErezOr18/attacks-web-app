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
exports.insertToDb = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Attack_1 = require("./entities/Attack");
const typeorm_1 = require("typeorm");
function insertToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataPath = path_1.default.join(__dirname, "../../data");
        const files = fs_1.default.readdirSync(dataPath);
        files.forEach((file) => {
            const content = fs_1.default.readFileSync(path_1.default.join(dataPath, file));
            const data = JSON.parse(content.toString());
            const objects = data["objects"];
            objects.forEach((object) => __awaiter(this, void 0, void 0, function* () {
                const id = object.id;
                const name = object.name;
                const description = object.description;
                const killChain = object.kill_chain_phases;
                const phaseName = [];
                if (killChain) {
                    killChain.forEach((kill) => {
                        phaseName.push(kill.phase_name);
                    });
                }
                const xMitrePlatforms = object.x_mitre_platforms;
                const xMitreDetection = [object.x_mitre_detection];
                const attackRepository = typeorm_1.getRepository(Attack_1.Attack);
                const res = yield attackRepository.insert({
                    id,
                    name,
                    description,
                    phaseName: phaseName.length === 0 ? ["NA"] : phaseName,
                    xMitrePlatforms,
                    xMitreDetection,
                });
                console.log(res.raw);
            }));
        });
    });
}
exports.insertToDb = insertToDb;
//# sourceMappingURL=helper.js.map