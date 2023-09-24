const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const { connectToDatabase, closeDatabase } = require("../configs/db");
const { profileModel } = require("../models/profileModel");

describe("GET /profile/:id", () => {
  before(async () => {
    // Connect to the test database
    await connectToDatabase();
  });

  after(async () => {
    // Close the database connection after tests
    await closeDatabase();
  });

  it("should return profile details for a valid ID", async () => {
    const sampleProfile = {
      name: "John Doe",
      description: "Sample description",
      mbti: "INTJ",
      enneagram: "5w6",
      variant: "sx/sp",
      tritype: 514,
      socionics: "INTp",
      sloan: "RLUEI",
      psyche: "CTVIP",
      image: "https://example.com/profile_image.jpg",
    };

    const savedProfile = await profileModel.create(sampleProfile);

    const response = await request(app).get(`/profile/${savedProfile.id}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("profile");
    expect(response.body.profile).to.have.property("name");
    expect(response.body.profile.name).to.equal(sampleProfile.name);
  });

  it("should return 404 for an invalid ID", async () => {
    const response = await request(app).get("/profile/invalidID");

    expect(response.status).to.equal(404);
    expect(response.text).to.equal("Profile not found");
  });
});

describe("POST /profile", () => {
  before(async () => {
    // Connect to the test database
    await connectToDatabase();
  });

  after(async () => {
    // Close the database connection after tests
    await closeDatabase();
  });

  it("should create a new profile", async () => {
    const newProfile = {
      name: "Jane Doe",
      description: "Another sample description",
      mbti: "INFP",
      enneagram: "4w5",
      variant: "sp/so",
      tritype: 451,
      socionics: "INFp",
      sloan: "RCUEI",
      psyche: "CTIVP",
      image: "https://example.com/another_profile_image.jpg",
    };

    const response = await request(app).post("/profile").send(newProfile);

    expect(response.status).to.equal(200);
    expect(response.body.status).to.be.true;
    expect(response.body.data).to.have.property("_id");
    expect(response.body.data.name).to.equal(newProfile.name);
  });

  it("should return an error for invalid profile data", async () => {
    const invalidProfile = {
      // Missing 'description' field, which is required
      name: "Jane Doe",
      mbti: "INFP",
      enneagram: "4w5",
      variant: "sp/so",
      tritype: 451,
      socionics: "INFp",
      sloan: "RCUEI",
      psyche: "CTIVP",
      image: "https://example.com/another_profile_image.jpg",
    };

    const response = await request(app).post("/profile").send(invalidProfile);

    expect(response.status).to.equal(500);
    expect(response.body.statusCode).to.equal(500);
    expect(response.body.message).to.equal("Internal Server Error");
  });
});
