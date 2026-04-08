import { useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, AlertCircle, Mail, Github, Linkedin, Globe } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-5xl mx-auto scroll-mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">Let's connect.</h2>
          <p className="text-lg text-zinc-400 font-light mb-12 max-w-md">
            I’m always open to discussing new opportunities, backend challenges, or AI automation projects.
          </p>

          <div className="space-y-6">
            <a href="mailto:yamkela22y@gmail.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:text-black transition-all duration-300">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Email</div>
                <div className="text-white group-hover:text-emerald-400 transition-colors">yamkela22y@gmail.com</div>
              </div>
            </a>

            <a href="https://github.com/yamkela-macwili" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:text-black transition-all duration-300">
                <Github size={20} />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">GitHub</div>
                <div className="text-white group-hover:text-emerald-400 transition-colors">github.com/yamkela-macwili</div>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/yamkela-macwili-116442253/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:text-black transition-all duration-300">
                <Linkedin size={20} />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">LinkedIn</div>
                <div className="text-white group-hover:text-emerald-400 transition-colors">linkedin.com/in/yamkela-macwili-116442253</div>
              </div>
            </a>

            <a href="https://www.macwili.co.za" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:text-black transition-all duration-300">
                <Globe size={20} />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Portfolio</div>
                <div className="text-white group-hover:text-emerald-400 transition-colors">macwili.co.za</div>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="glass-panel rounded-3xl p-8 md:p-10"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <input 
                  {...register("name", { required: "Name is required" })}
                  type="text" 
                  className={`w-full bg-transparent border-b py-4 text-white font-light focus:outline-none transition-colors placeholder:text-zinc-600 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-emerald-400'}`}
                  placeholder="Name" 
                />
                {errors.name && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.name.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <input 
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type="email" 
                  className={`w-full bg-transparent border-b py-4 text-white font-light focus:outline-none transition-colors placeholder:text-zinc-600 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-emerald-400'}`}
                  placeholder="Email" 
                />
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <input 
                {...register("subject", { required: "Subject is required" })}
                type="text" 
                className={`w-full bg-transparent border-b py-4 text-white font-light focus:outline-none transition-colors placeholder:text-zinc-600 ${errors.subject ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-emerald-400'}`}
                placeholder="Subject" 
              />
              {errors.subject && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.subject.message}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <textarea 
                {...register("message", { required: "Message is required" })}
                rows={4} 
                className={`w-full bg-transparent border-b py-4 text-white font-light focus:outline-none transition-colors placeholder:text-zinc-600 resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-emerald-400'}`}
                placeholder="Message"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.message.message}
                </p>
              )}
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting || isSubmitted}
              className="w-full py-4 bg-white text-black rounded-full font-medium hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-8"
            >
              {isSubmitting ? (
                <><Loader2 size={20} className="animate-spin" /> Sending...</>
              ) : isSubmitted ? (
                "Message Sent"
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
