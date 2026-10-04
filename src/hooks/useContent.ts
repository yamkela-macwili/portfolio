import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Project, BlogPost, Education, Certification, Skill } from '../types';
import {
  defaultSkills,
  defaultEducation,
  projects as defaultProjects,
  posts as defaultPosts,
  defaultCertifications,
} from '../data';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      if (!supabase) {
        setProjects(defaultProjects);
        setLoading(false);
        return;
      }

      try {
        const { data, error: dbError } = await supabase.from('projects').select('*');

        if (dbError) {
          console.warn('Supabase query returned error, using fallback data:', dbError.message);
          setProjects(defaultProjects);
          return;
        }

        if (data && data.length > 0) {
          const mappedProjects = data.map((p: any) => {
            const dbSlug = (p.slug || '').trim().toLowerCase();
            const defaultProj = defaultProjects.find(
              (dp) => (dp.slug || '').trim().toLowerCase() === dbSlug
            );

            return {
              ...p,
              problem: p.problem || defaultProj?.problem || 'Problem description pending...',
              solution: p.solution || defaultProj?.solution || 'Solution details pending...',
              impact: p.impact || defaultProj?.impact || 'Impact statement pending...',
              projectType: p.projectType || p.project_type || defaultProj?.projectType || 'Personal Project',
              tech: p.tech || defaultProj?.tech || [],
              featured:
                p.featured !== null && p.featured !== undefined ? p.featured : (defaultProj?.featured ?? false),
              github: p.github || defaultProj?.github || '',
              link: p.link || defaultProj?.link || '',
              desc: p.desc || defaultProj?.desc || '',
              category: p.category || defaultProj?.category || 'Development',
            };
          });

          const sortedProjects = mappedProjects.sort((a: any, b: any) => {
            if (a.created_at && b.created_at) {
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
            return 0;
          });

          setProjects(sortedProjects);
        } else {
          setProjects(defaultProjects);
        }
      } catch (err: any) {
        console.warn('Supabase connection unavailable, using local project data.');
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

export function usePosts() {
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      if (!supabase) {
        setPosts(defaultPosts);
        setLoading(false);
        return;
      }

      try {
        const { data, error: dbError } = await supabase.from('posts').select('*');

        if (dbError) {
          console.warn('Supabase query returned error, using fallback posts:', dbError.message);
          setPosts(defaultPosts);
          return;
        }

        if (data && data.length > 0) {
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
        console.warn('Supabase connection unavailable, using local blog posts.');
        setPosts(defaultPosts);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export function useProject(slug: string | undefined) {
  const [project, setProject] = useState<Project | null>(() => {
    if (!slug) return null;
    return defaultProjects.find((p) => p.slug === slug) || null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) {
        setLoading(false);
        return;
      }

      const localProject = defaultProjects.find((p) => p.slug === slug) || null;

      if (!supabase) {
        setProject(localProject);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();

        if (error || !data) {
          setProject(localProject);
        } else {
          const dbSlug = (slug || '').trim().toLowerCase();
          const defaultProj = defaultProjects.find((dp) => (dp.slug || '').trim().toLowerCase() === dbSlug);

          const mappedProject = {
            ...data,
            problem: data.problem || defaultProj?.problem || 'Problem description pending...',
            solution: data.solution || defaultProj?.solution || 'Solution details pending...',
            impact: data.impact || defaultProj?.impact || 'Impact statement pending...',
            projectType: data.projectType || data.project_type || defaultProj?.projectType || 'Personal Project',
            tech: data.tech || defaultProj?.tech || [],
            github: data.github || defaultProj?.github || '',
            link: data.link || defaultProj?.link || '',
            desc: data.desc || defaultProj?.desc || '',
            category: data.category || defaultProj?.category || 'Development',
          };
          setProject(mappedProject);
        }
      } catch {
        setProject(localProject);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  return { project, loading };
}

export function usePost(slug: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(() => {
    if (!slug) return null;
    return defaultPosts.find((p) => p.slug === slug) || null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setLoading(false);
        return;
      }

      const localPost = defaultPosts.find((p) => p.slug === slug) || null;

      if (!supabase) {
        setPost(localPost);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).single();

        if (error || !data) {
          setPost(localPost);
        } else {
          setPost({
            ...data,
            readTime: data.readTime || data.read_time,
          });
        }
      } catch {
        setPost(localPost);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, loading };
}

export function useEducation() {
  const [education, setEducation] = useState<Education[]>(defaultEducation);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEducation() {
      if (!supabase) {
        setEducation(defaultEducation);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('period', { ascending: false });

        if (error || !data || data.length === 0) {
          setEducation(defaultEducation);
        } else {
          setEducation(data);
        }
      } catch {
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
  const [certifications, setCertifications] = useState<Certification[]>(defaultCertifications);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCertifications() {
      if (!supabase) {
        setCertifications(defaultCertifications);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .order('date', { ascending: false });

        if (error || !data || data.length === 0) {
          setCertifications(defaultCertifications);
        } else {
          setCertifications(data);
        }
      } catch {
        setCertifications(defaultCertifications);
      } finally {
        setLoading(false);
      }
    }

    fetchCertifications();
  }, []);

  return { certifications, loading };
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      if (!supabase) {
        setSkills(defaultSkills);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.from('skills').select('*');

        if (error || !data || data.length === 0) {
          setSkills(defaultSkills);
        } else {
          setSkills(data);
        }
      } catch {
        setSkills(defaultSkills);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return { skills, loading };
}
