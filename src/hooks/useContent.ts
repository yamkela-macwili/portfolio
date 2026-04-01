import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Project, BlogPost, Education, Certification, Skill } from '../types';
import { defaultSkills, defaultEducation, projects as defaultProjects, posts as defaultPosts } from '../data';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        if (!supabase) {
          console.log('Supabase client not initialized');
          setProjects(defaultProjects);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('projects')
          .select('*');

        if (error) throw error;

        if (data && data.length > 0) {
          // Map snake_case to camelCase if needed and sort
          const mappedProjects = data.map((p: any) => ({
            ...p,
            projectType: p.projectType || p.project_type,
          }));

          const dbProjects = mappedProjects.sort((a: any, b: any) => {
            if (a.created_at && b.created_at) {
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
            return 0;
          });

          setProjects(dbProjects);
        } else {
          setProjects(defaultProjects);
        }
      } catch (err: any) {
        console.error('Error fetching projects from Supabase:', err);
        setProjects(defaultProjects);
        setError(err.message || 'Failed to connect to database');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

export function usePosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        if (!supabase) {
          setPosts(defaultPosts);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('posts')
          .select('*');

        if (error) throw error;

        if (data && data.length > 0) {
          // Map snake_case to camelCase if needed and sort
          const mappedPosts = data.map((p: any) => ({
            ...p,
            readTime: p.readTime || p.read_time,
          }));

          const dbPosts = mappedPosts.sort((a: any, b: any) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });

          setPosts(dbPosts);
        } else {
          setPosts(defaultPosts);
        }
      } catch (err: any) {
        console.error('Error fetching posts:', err);
        setPosts(defaultPosts);
        setError(err.message || 'Failed to connect to database');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export function useProject(slug: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return;
      
      try {
        if (!supabase) {
          const localProject = defaultProjects.find(p => p.slug === slug);
          setProject(localProject || null);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            console.log(`Project ${slug} not found in Supabase`);
            const localProject = defaultProjects.find(p => p.slug === slug);
            setProject(localProject || null);
          } else {
            console.error(`Supabase error fetching project ${slug}:`, error);
            throw error;
          }
        } else if (data) {
          const mappedProject = {
            ...data,
            projectType: data.projectType || data.project_type,
          };
          setProject(mappedProject);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error('Error fetching project from Supabase:', err);
        const localProject = defaultProjects.find(p => p.slug === slug);
        setProject(localProject || null);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  return { project, loading };
}

export function usePost(slug: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;

      try {
        if (!supabase) {
          const localPost = defaultPosts.find(p => p.slug === slug);
          setPost(localPost || null);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            const localPost = defaultPosts.find(p => p.slug === slug);
            setPost(localPost || null);
          } else {
            throw error;
          }
        } else if (data) {
          const mappedPost = {
            ...data,
            readTime: data.readTime || data.read_time,
          };
          setPost(mappedPost);
        }
      } catch (err) {
        console.error('Error fetching post from Supabase:', err);
        const localPost = defaultPosts.find(p => p.slug === slug);
        setPost(localPost || null);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, loading };
}

export function useEducation() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEducation() {
      try {
        if (!supabase) {
          setEducation(defaultEducation);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('period', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setEducation(data);
        } else {
          setEducation(defaultEducation);
        }
      } catch (err) {
        console.error('Error fetching education:', err);
        setEducation(defaultEducation);
      } finally {
        setLoading(false);
      }
    }

    fetchEducation();
  }, []);

  return { education, loading };
}

export function useCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCertifications() {
      try {
        if (!supabase) {
          setCertifications([]);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setCertifications(data);
        } else {
          setCertifications([]);
        }
      } catch (err) {
        console.error('Error fetching certifications:', err);
        setCertifications([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCertifications();
  }, []);

  return { certifications, loading };
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        if (!supabase) {
          setSkills(defaultSkills);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('skills')
          .select('*');

        if (error) throw error;
        
        if (data && data.length > 0) {
          setSkills(data);
        } else {
          setSkills(defaultSkills);
        }
      } catch (err) {
        console.error('Error fetching skills:', err);
        setSkills(defaultSkills);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return { skills, loading };
}
