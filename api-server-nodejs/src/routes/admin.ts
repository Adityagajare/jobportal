import express from "express";
import { getRepository, MoreThanOrEqual } from "typeorm";
import Location from "../models/location";
import job_details from "../models/job_details";
import Category from "../models/category";
import Skills from "../models/skills";
import Job_details from "../models/job_details";

const adminRouter = express.Router();

// Helper function to check if a record exists in the repository
const checkIfExists = async (repository: any, id: string): Promise<boolean> => {
  const record = await repository.findOne(id);
  return record !== undefined;
};

// Create a new job
adminRouter.post("/jobcreate", async (req, res) => {
  const jobDetailsRepository = getRepository(job_details);
  const locationRepository = getRepository(Location);
  const categoryRepository = getRepository(Category);
  const skillsRepository = getRepository(Skills);
  const {
    title,
    description,
    locationId,
    salary,
    skills,
    categoryId,
    dateOfPost,
    lastDate,
    experience,
    education,
    jobType
  } = req.body;

try {
  // Check if the location exists
  const locationExists = await checkIfExists(locationRepository, locationId);
  if (!locationExists) {
    return res.status(400).json({ error: "Invalid location ID" });
  }

  // Check if the category exists
  const categoryExists = await checkIfExists(categoryRepository, categoryId);
  if (!categoryExists) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  // Fetch skill entities
  const skillEntities = await skillsRepository.findByIds(skills);
  if (skillEntities.length !== skills.length) {
    return res.status(400).json({ error: "One or more skills are invalid" });
  }

  // Create and save the new job
  const newJob = jobDetailsRepository.create({
    title,
    description,
    locationId,
    salary,
    skills: skillEntities,  // Use Skill entities
    categoryId,
    dateOfPost,
    lastDate,
    experience,
    education,
    jobType
  });

  await jobDetailsRepository.save(newJob);
  res.status(201).json(newJob);
} catch (error) {
  console.error("Error saving job:", error);
  res.status(500).json({ error: "Error saving job" });
}
});

adminRouter.get("/jobdetails", async (_req, res) => {
  try {
    const jobRepository = getRepository(Job_details);
    const jobs = await jobRepository.find({
      relations: ["location", "skills", "category"],
    });
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ success: false, msg: "Error fetching jobs" });
  }
});

// Delete a job by ID
adminRouter.delete("/jobdelete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const jobRepository = getRepository(job_details);
    const result = await jobRepository.delete(id);

    if (result.affected === 1) {
      res.status(200).json({ message: "Job deleted successfully" });
    } else {
      res.status(404).json({ message: "Job not found or already deleted" });
    }
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Error deleting job", error: error });
  }
});

// Get job details by ID
adminRouter.get("/job/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const jobRepository = getRepository(job_details);
    const job = await jobRepository.findOne(id,{
      relations:['location','skills','category']
    });
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ error: "Failed to fetch job details" });
  }
});

adminRouter.put("/jobupdate/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    locationId,
    salary,
    skills: skillIds, // Array of skill IDs
    categoryId,
    dateOfPost,
    lastDate,
    experience,
    jobType,
    education
  } = req.body;

  try {
    const jobRepository = getRepository(Job_details);
    const locationRepository = getRepository(Location);
    const categoryRepository = getRepository(Category);
    const skillsRepository = getRepository(Skills);

    // Fetch the job to update
    let job = await jobRepository.findOne({
      where: { id },
      relations: ['skills'], // Ensure skills are loaded
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Validate and update location
    const locationExists = await locationRepository.findOne(locationId);
    if (!locationExists) {
      return res.status(400).json({ error: "Invalid location ID" });
    }

    // Validate and update category
    const categoryExists = await categoryRepository.findOne(categoryId);
    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    // Validate and update skills
    const skillEntities = await skillsRepository.findByIds(skillIds);
    if (skillEntities.length !== skillIds.length) {
      return res.status(400).json({ error: "One or more skills are invalid" });
    }

    // Update job details
    job.title = title;
    job.description = description;
    job.locationId = locationId;
    job.salary = salary;
    job.skills = skillEntities;
    job.categoryId = categoryId;
    job.dateOfPost = new Date(dateOfPost);
    job.lastDate = new Date(lastDate);
    job.education = education;
    job.jobType = jobType;
    job.experience = experience;

    // Save the updated job
    await jobRepository.save(job);

    res.json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
});

// Get total job count
adminRouter.get("/totalcount", async (_req, res) => {
  try {
    const jobDetailsRepository = getRepository(job_details);
    const totalCount = await jobDetailsRepository.count();
    res.json({ count: totalCount });
  } catch (error) {
    console.error("Error fetching total job listings count:", error);
    res.status(500).json({ error: "Failed to fetch total job listings count" });
  }
});

// Get count of active jobs
adminRouter.get("/activejobs/count", async (_req, res) => {
  try {
    const jobDetailsRepository = getRepository(job_details);

    // Calculate today's date
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Set to start of day in UTC

    // Fetch count of jobs where lastDate is greater than or equal to today
    const activeJobsCount = await jobDetailsRepository.count({
      where: {
        lastDate: MoreThanOrEqual(today.toISOString()), // Assuming lastDate is stored as ISOString
      },
    });

    res.status(200).json({ count: activeJobsCount });
  } catch (error) {
    console.error("Error fetching active jobs count:", error);
    res.status(500).json({ error: "Failed to fetch active jobs count" });
  }
});

// Get job counts by category
adminRouter.get("/jobcounts", async (_req, res) => {
  try {
    const jobDetailsRepository = getRepository(Job_details);
    const categoryRepository = getRepository(Category);

    const categories = await categoryRepository.find();

    const counts = await Promise.all(
      categories.map(async (category) => {
        const count = await jobDetailsRepository.count({ where: { categoryId: category.id } });
        return { category: category.categoryname, count };
      })
    );
    res.status(200).json({counts})
  } catch (error) {
    console.error("Error fetching job counts:", error);
    res.status(500).json({ error: "Failed to fetch job counts" });
  }
});


// Create a new location
adminRouter.post("/createlocation", async (req, res) => {
  const locationRepository = getRepository(Location);
  const { city, country } = req.body;

  if (!city || !country) {
    return res.status(400).json({ error: "City and country are required" });
  }

  const newLocation = locationRepository.create({ city, country });

  try {
    await locationRepository.save(newLocation);
    res.status(201).json(newLocation);
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ error: "Error saving location" });
  }
});

// Get all locations
adminRouter.get('/locations', async (_req, res) => {
  try {
    const locationRepository = getRepository(Location);
    const locations = await locationRepository.find();
    res.status(200).json({ success: true, locations });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ success: false, msg: "Error fetching locations" });
  }
});

// Update a location by ID
adminRouter.put('/updatelocation/:id', async (req, res) => {
  const { id } = req.params;
  const { city, country } = req.body;

  try {
    const locationRepository = getRepository(Location);
    let location = await locationRepository.findOne(id);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    location.city = city;
    location.country = country;

    await locationRepository.save(location);
    res.json({ message: "Location updated successfully", location });
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ error: "Failed to update location" });
  }
});

// Delete a location by ID
adminRouter.delete('/deletelocation/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const locationRepository = getRepository(Location);
    const result = await locationRepository.delete(id);

    if (result.affected === 1) {
      res.status(200).json({ message: "Location deleted successfully" });
    } else {
      res.status(404).json({ message: "Location not found or already deleted" });
    }
  } catch (error) {
    console.error("Error deleting location:", error);
    res.status(500).json({ message: "Error deleting location" });
  }
});

// Create a new category
adminRouter.post("/categories", async (req, res) => {
  const categoryRepository = getRepository(Category);
  const { categoryname } = req.body;

  const newCategory = categoryRepository.create({ categoryname });

  try {
    await categoryRepository.save(newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error saving category:", error);
    res.status(500).json({ error: "Error saving category" });
  }
});

// Update a category by ID
adminRouter.put("/updatecategory/:id", async (req, res) => {
  const { id } = req.params;
  const { categoryname } = req.body;

  try {
    const categoryRepository = getRepository(Category);
    let category = await categoryRepository.findOne(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.categoryname = categoryname;

    await categoryRepository.save(category);
    res.json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
});

// Delete a category by ID
adminRouter.delete("/categorydelete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const categoryRepository = getRepository(Category);
    const result = await categoryRepository.delete(id);

    if (result.affected === 1) {
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Category not found or already deleted" });
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Error deleting category" });
  }
});

// Get all categories
adminRouter.get("/categories", async (_req, res) => {
  try {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, msg: "Error fetching categories" });
  }
});

// Create a new skill
adminRouter.post("/skill", async (req, res) => {
  const skillRepository = getRepository(Skills);
  const { skill } = req.body;

  const newSkill = skillRepository.create({ skill });

  try {
    await skillRepository.save(newSkill);
    res.status(201).json(newSkill);
  } catch (error) {
    console.error("Error saving skill:", error);
    res.status(500).json({ error: "Error saving skill" });
  }
});

// Get all skills
adminRouter.get('/skills', async (_req, res) => {
  try {
    const skillRepository = getRepository(Skills);
    const skills = await skillRepository.find();
    res.status(200).json({ success: true, skills });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ success: false, msg: "Error fetching skills" });
  }
});

// Update a skill by ID
adminRouter.put('/skill/:id', async (req, res) => {
  const { id } = req.params;
  const { skill } = req.body;

  try {
    const skillRepository = getRepository(Skills);
    let getSkill = await skillRepository.findOne(id);
    if (!getSkill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    getSkill.skill = skill;
    await skillRepository.save(getSkill);
    res.json({ message: "Skill updated successfully", skill });
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).json({ error: "Failed to update skill" });
  }
});

// Delete a skill by ID
adminRouter.delete('/skill/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const skillRepository = getRepository(Skills);
    const result = await skillRepository.delete(id);

    if (result.affected === 1) {
      res.status(200).json({ message: "Skill deleted successfully" });
    } else {
      res.status(404).json({ message: "Skill not found or already deleted" });
    }
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ message: "Error deleting skill" });
  }
});

export default adminRouter;
