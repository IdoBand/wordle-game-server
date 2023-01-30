import { expect } from "chai";
import dbClient from "./clientConfigAndConnect";

describe('clientConfig&Connect', () => {
    it('should throw Error because client is not defined', () => {
        expect(() => dbClient()).throws();
    });
});