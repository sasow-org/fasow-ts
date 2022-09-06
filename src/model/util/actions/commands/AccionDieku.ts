import {Action} from "../Action";
import {Agent} from "../../../essential/Agent";

class AccionDieku extends Action{

    Execute(agent: Agent): void {
        console.log("Hola dieku")
    }

}