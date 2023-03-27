import * as alt from "alt-client";
import * as natives from "natives";
import mp from "../../shared/mp.js";
import { Pool } from "../Pool.js";

export class _Vehicle {
    #alt;

    /** @param {alt.Vehicle} alt */
    constructor(alt) {
        this.#alt = alt;
    }

    get handle() {
        return this.#alt.scriptID;
    }

    get id() {
        return this.#alt.id;
    }

    get remoteId() {
        return this.#alt.remoteId;
    }

    get position() {
        return new mp.Vector3(this.#alt.position);
    }

    get gear() {
        return this.#alt.gear;
    }

    get rpm() {
        return this.#alt.rpm;
    }

    // TODO: reverse and implement steeringAngle in core
    // TODO: nosActive (nitro)
    // TODO: nosAmount (nitro)
    // TODO: getHandling
    // TODO: getDefaultHandling

    get wheelCount() {
        return this.#alt.wheelsCount;
    }

    get type() {
        return "vehicle";
    }
}

Object.defineProperty(alt.Vehicle.prototype, "mp", { 
    get() {
        return this._mp ??= new _Vehicle(this);
    } 
});

mp.Vehicle = _Vehicle;

mp.vehicles = new Pool(() => alt.Player.all, () => alt.Player.streamedIn);

mp.vehicles.at = function(id) {
    return alt.Vehicle.getByID(id)?.mp ?? null;
}

mp.vehicles.atRemoteId = function(id) {
    return alt.Vehicle.getByRemoteID(id)?.mp ?? null;
}

mp.vehicles.atHandle = function(handle) {
    return alt.Vehicle.getByScriptID(handle)?.mp ?? null;
}

mp.vehicles.exists = function(id) {
    return alt.Vehicle.getByID(id) != null;
}