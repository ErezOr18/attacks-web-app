import path from "path";
import fs from "fs";
import { Attack } from "./entities/Attack";
import { getRepository } from "typeorm";
export async function insertToDb() {
  const dataPath = path.join(__dirname, "../../data");
  const files = fs.readdirSync(dataPath);

  files.forEach((file) => {
    const content = fs.readFileSync(path.join(dataPath, file));
    const data = JSON.parse(content.toString());
    const objects: any[] = data["objects"];
    objects.forEach(async (object) => {
      const id: string = object.id;
      const name: string = object.name;
      const description: string = object.description;
      const killChain: any[] = object.kill_chain_phases;
      const phaseName: string[] = [];
      if (killChain) {
        killChain.forEach((kill) => {
          phaseName.push(kill.phase_name);
        });
      }
      const xMitrePlatforms: string[] = object.x_mitre_platforms;
      const xMitreDetection: string[] = [object.x_mitre_detection];
      const attackRepository = getRepository(Attack);
      const res = await attackRepository.insert({
        id,
        name,
        description,
        phaseName: phaseName.length === 0 ? ["NA"] : phaseName,
        xMitrePlatforms,
        xMitreDetection,
      });
      console.log(res.raw);
    });
  });
}
