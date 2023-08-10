import * as localforage from "localforage";
import { SPOOL_DATABASE_NAME } from "@/constants";

localforage.config({
  name: SPOOL_DATABASE_NAME,
});

export default localforage;
