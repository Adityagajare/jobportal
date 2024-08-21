import React, { useState, useEffect } from 'react';
import BASE_URL from '../services/service';

export interface JobDetails {
  id?: string;
  title: string;
  description: string;
  locationId: number;
  salary: string;
  skills: number[]; // Array of skill IDs
  categoryId: number;
  dateOfPost: string;
  lastDate: string;
  experience: string;
  jobType: string;
  education: string;
}

interface JobFormProps {
  onSubmit: (jobDetails: JobDetails, resetForm: () => void) => void;
  initialJob?: JobDetails;
}

const JobForm: React.FC<JobFormProps> = ({ onSubmit, initialJob }) => {
  const [jobDetails, setJobDetails] = useState<JobDetails>({
    id: initialJob?.id || '',
    title: initialJob?.title || '',
    description: initialJob?.description || '',
    locationId: initialJob?.locationId || 0,
    salary: initialJob?.salary || '',
    skills: initialJob?.skills || [],
    categoryId: initialJob?.categoryId || 0,
    dateOfPost: initialJob?.dateOfPost || '',
    lastDate: initialJob?.lastDate || '',
    experience: initialJob?.experience || '',
    jobType: initialJob?.jobType || '',
    education: initialJob?.education || '',
  });

  const [locations, setLocations] = useState<{ id: number; city: string; country: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; categoryName: string }[]>([]);
  const [allSkills, setAllSkills] = useState<{ id: number; skillName: string }[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<{ id: number; skillName: string }[]>([]);
  const [errors, setErrors] = useState<Partial<JobDetails>>({});

  // Fetch locations
  const fetchLocations = async () => {
    const response = await fetch(`${BASE_URL}/admin/locations`);
    if (!response.ok) throw new Error('Failed to fetch locations');
    const data = await response.json();
    return data.locations;
  };

  // Fetch categories
  const fetchCategories = async () => {
    const response = await fetch(`${BASE_URL}/admin/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    return data.categories;
  };

  // Fetch skills
  const fetchSkills = async () => {
    const response = await fetch(`${BASE_URL}/admin/skills`);
    if (!response.ok) throw new Error('Failed to fetch skills');
    const data = await response.json();
    return data.skills;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsData = await fetchLocations();
        setLocations(locationsData);

        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        const skillsData = await fetchSkills();
        setAllSkills(skillsData);

        if (initialJob) {
          setSelectedSkills(skillsData.filter(skill => initialJob.skills.includes(skill.id)));
        } else {
          setSelectedSkills([]);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [initialJob]);

  useEffect(() => {
    if (initialJob) {
      setJobDetails(prevState => ({
        ...prevState,
        ...initialJob,
        skills: initialJob.skills || [],
      }));
    }
  }, [initialJob]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? Number(value) : value;
    setJobDetails(prevState => ({
      ...prevState,
      [name]: newValue,
    }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSkillSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selectedSkill = allSkills.find(skill => skill.id === selectedId);

    if (selectedSkill && !selectedSkills.some(skill => skill.id === selectedId)) {
      setSelectedSkills(prevSkills => [...prevSkills, selectedSkill]);
      setJobDetails(prevState => ({
        ...prevState,
        skills: [...prevState.skills, selectedId],
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove: { id: number; skillName: string }) => {
    setSelectedSkills(prevSkills => prevSkills.filter(skill => skill.id !== skillToRemove.id));
    setJobDetails(prevState => ({
      ...prevState,
      skills: prevState.skills.filter(skillId => skillId !== skillToRemove.id),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(jobDetails, resetForm);
    }
  };

  const validate = () => {
    const newErrors: Partial<JobDetails> = {};

    if (!jobDetails.title.trim()) newErrors.title = 'Job title is required';
    if (!jobDetails.description.trim()) newErrors.description = 'Job description is required';
    if (!jobDetails.locationId) newErrors.locationId = 'Job location is required';
    if (!jobDetails.salary.trim()) newErrors.salary = 'Salary is required';
    if (jobDetails.skills.length === 0) newErrors.skills = 'At least one skill is required';
    if (!jobDetails.categoryId) newErrors.categoryId = 'Category is required';

    const currentDate = new Date().toISOString().split('T')[0];
    if (!jobDetails.dateOfPost || jobDetails.dateOfPost > currentDate) {
      newErrors.dateOfPost = 'Invalid date of post';
    }
    if (!jobDetails.lastDate || jobDetails.lastDate < currentDate) {
      newErrors.lastDate = 'Invalid last date';
    }

    // New validations
    if (!jobDetails.experience.trim()) newErrors.experience = 'Experience is required';
    if (!jobDetails.jobType.trim()) newErrors.jobType = 'Job type is required';
    if (!jobDetails.education.trim()) newErrors.education = 'Education is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setJobDetails({
      id: '',
      title: '',
      description: '',
      locationId: 0,
      salary: '',
      skills: [],
      categoryId: 0,
      dateOfPost: '',
      lastDate: '',
      experience: '',
      jobType: '',
      education: '',
    });
    setSelectedSkills([]);
    setErrors({});
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-md-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2>{initialJob ? 'Edit Job' : 'Post a Job'}</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="mt-4">
                {/* Job Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Job Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={jobDetails.title}
                    onChange={handleChange}
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    placeholder="Enter job title"
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                {/* Job Description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Job Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={jobDetails.description}
                    onChange={handleChange}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    rows={3}
                    placeholder="Enter job description"
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                {/* Location */}
                <div className="mb-3">
                  <label htmlFor="locationId" className="form-label">Location</label>
                  <select
                    id="locationId"
                    name="locationId"
                    value={jobDetails.locationId}
                    onChange={handleChange}
                    className={`form-control ${errors.locationId ? 'is-invalid' : ''}`}
                  >
                    <option value={0}>Select Location</option>
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>{`${loc.city}, ${loc.country}`}</option>
                    ))}
                  </select>
                  {errors.locationId && <div className="invalid-feedback">{errors.locationId}</div>}
                </div>

                {/* Salary */}
                <div className="mb-3">
                  <label htmlFor="salary" className="form-label">Salary</label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    value={jobDetails.salary}
                    onChange={handleChange}
                    className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                    placeholder="Enter salary"
                  />
                  {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
                </div>

                {/* Skills */}
                <div className="mb-3">
                  <label htmlFor="skills" className="form-label">Skills</label>
                  <select
                    id="skills"
                    name="skills"
                    onChange={handleSkillSelect}
                    className={`form-control ${errors.skills ? 'is-invalid' : ''}`}
                  >
                    <option value={0}>Select Skill</option>
                    {allSkills.map(skill => (
                      <option key={skill.id} value={skill.id}>{skill.skill}</option>
                    ))}
                  </select>
                  {selectedSkills.length > 0 && (
                    <ul className="list-group mt-2">
                      {selectedSkills.map(skill => (
                        <li key={skill.id} className="list-group-item d-flex justify-content-between align-items-center">
                          {skill.skill}
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {errors.skills && <div className="invalid-feedback">{errors.skills}</div>}
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label htmlFor="categoryId" className="form-label">Category</label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={jobDetails.categoryId}
                    onChange={handleChange}
                    className={`form-control ${errors.categoryId ? 'is-invalid' : ''}`}
                  >
                    <option value={0}>Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.categoryname}</option>
                    ))}
                  </select>
                  {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
                </div>

                {/* Date of Post */}
                <div className="mb-3">
                  <label htmlFor="dateOfPost" className="form-label">Date of Post</label>
                  <input
                    type="date"
                    id="dateOfPost"
                    name="dateOfPost"
                    value={jobDetails.dateOfPost}
                    onChange={handleChange}
                    className={`form-control ${errors.dateOfPost ? 'is-invalid' : ''}`}
                  />
                  {errors.dateOfPost && <div className="invalid-feedback">{errors.dateOfPost}</div>}
                </div>

                {/* Last Date */}
                <div className="mb-3">
                  <label htmlFor="lastDate" className="form-label">Last Date</label>
                  <input
                    type="date"
                    id="lastDate"
                    name="lastDate"
                    value={jobDetails.lastDate}
                    onChange={handleChange}
                    className={`form-control ${errors.lastDate ? 'is-invalid' : ''}`}
                  />
                  {errors.lastDate && <div className="invalid-feedback">{errors.lastDate}</div>}
                </div>

                {/* Experience */}
                <div className="mb-3">
                  <label htmlFor="experience" className="form-label">Experience</label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={jobDetails.experience}
                    onChange={handleChange}
                    className={`form-control ${errors.experience ? 'is-invalid' : ''}`}
                    placeholder="Enter experience required"
                  />
                  {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
                </div>

                {/* Job Type */}
                <div className="mb-3">
                  <label htmlFor="jobType" className="form-label">Job Type</label>
                  <input
                    type="text"
                    id="jobType"
                    name="jobType"
                    value={jobDetails.jobType}
                    onChange={handleChange}
                    className={`form-control ${errors.jobType ? 'is-invalid' : ''}`}
                    placeholder="Enter job type"
                  />
                  {errors.jobType && <div className="invalid-feedback">{errors.jobType}</div>}
                </div>

                {/* Education */}
                <div className="mb-3">
                  <label htmlFor="education" className="form-label">Education</label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={jobDetails.education}
                    onChange={handleChange}
                    className={`form-control ${errors.education ? 'is-invalid' : ''}`}
                    placeholder="Enter required education"
                  />
                  {errors.education && <div className="invalid-feedback">{errors.education}</div>}
                </div>

                {/* Submit Button */}
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    {initialJob ? 'Update Job' : 'Post Job'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
