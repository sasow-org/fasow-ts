import { AgentConfig } from './AgentConfig';

export class SimulationConfig {
  private _networkSize: number;

  private _agentsConfigs: AgentConfig[];

  private _periods: number;

  private _simulationType: string;

  constructor(simulationType: string, periods: number, networkSize: number, seedSize: number, agentsConfigs: AgentConfig[]) {
    this._simulationType = simulationType;
    this._networkSize = networkSize;
    this._agentsConfigs = agentsConfigs;
    this._periods = periods;
  }

  get seedSize(): number {
    let total = 0;
    for (let i = 0; i < this._agentsConfigs.length; i++) {
      if (this._agentsConfigs[i].isSeed) {
        total += this._agentsConfigs[i].quantityAgent;
      }
    }
    return total;
  }

  get networkSize(): number {
    return this._networkSize;
  }

  set networkSize(value: number) {
    this._networkSize = value;
  }

  get agentsConfigs(): AgentConfig[] {
    return this._agentsConfigs;
  }

  set agentsConfigs(value: AgentConfig[]) {
    this._agentsConfigs = value;
  }

  get periods(): number {
    return this._periods;
  }

  set periods(value: number) {
    this._periods = value;
  }

  get simulationType(): string {
    return this._simulationType;
  }

  set simulationType(value: string) {
    this._simulationType = value;
  }
}
