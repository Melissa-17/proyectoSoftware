import '#Models/Relationship/RelationshipConfig.js';
import db from '#Config/db.js';

await db.sync({ force: true });
console.log("All models were synchronized successfully.");
