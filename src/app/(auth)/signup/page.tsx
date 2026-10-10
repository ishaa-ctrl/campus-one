'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, User, Hash, Building2, BookOpen, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';
import { signUpSchema } from '@/lib/validations/auth';
import { DEPARTMENTS, SEMESTERS, validateCollegeEmail } from '@/lib/utils';
import SearchableDropdown, { type DropdownOption } from '@/components/ui/SearchableDropdown';
import CollegeSelector from '@/components/ui/CollegeSelector';

// Build department options once
const DEPT_OPTIONS: DropdownOption[] = DEPARTMENTS.map((d) => ({ value: d, label: d }));

// Build semester options once
const SEM_OPTIONS: DropdownOption[] = SEMESTERS.map((s) => ({
  value: String(s),
  label: `Semester ${s}`,
}));

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    usn: '',
    department: '',
    semester: 0,
    college: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateCollegeEmail(formData.email)) {
      const domain = process.env.NEXT_PUBLIC_COLLEGE_EMAIL_DOMAIN || 'your college';
      setErrors({ email: `Please use your college email (@${domain})` });
      return;
    }

    const result = signUpSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();

      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('usn')
        .eq('usn', formData.usn.toUpperCase())
        .single();

      if (existingProfile) {
        setErrors({ usn: 'This USN is already registered' });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.full_name,
            usn: formData.usn.toUpperCase(),
            department: formData.department,
            semester: formData.semester,
            college: formData.college,
          },
        },
      });

      if (error) {
        const msg = error.message.toLowerCase();
        if (
          msg.includes('failed to fetch') ||
          msg.includes('fetch') ||
          msg.includes('network')
        ) {
          toast.error(
            'Unable to connect to the authentication server. Please check your internet connection or verify the Supabase backend service status.'
          );
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
          user_id: data.user.id,
          full_name: formData.full_name,
          email: formData.email,
          usn: formData.usn.toUpperCase(),
          department: formData.department,
          semester: formData.semester,
          college: formData.college,
        });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        toast.success('Account created! Please check your email to verify.');
        router.push('/login');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      if (message.includes('Supabase environment variables are not configured')) {
        toast.error(
          'Authentication is not configured on this deployment. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel settings.'
        );
      } else if (message.toLowerCase().includes('fetch') || message.toLowerCase().includes('network')) {
        toast.error(
          'Unable to connect to the authentication server. Please check your internet connection or verify the Supabase backend service status.'
        );
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-campus-text">Create Account</h1>
        <p className="text-campus-text-secondary text-sm mt-1">Join your campus community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="full_name" className="label">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-campus-text-secondary z-10 pointer-events-none" />
            <input
              id="full_name"
              type="text"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={(e) => updateField('full_name', e.target.value)}
              className="input-field pl-11"
            />
          </div>
          {errors.full_name && <p className="text-campus-danger text-xs mt-1">{errors.full_name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="label">College Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-campus-text-secondary z-10 pointer-events-none" />
            <input
              id="email"
              type="email"
              placeholder="you@college.edu"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="input-field pl-11"
            />
          </div>
          {errors.email && <p className="text-campus-danger text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password + Confirm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="password" className="label">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-campus-text-secondary z-10 pointer-events-none" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                className="input-field pl-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-campus-text-secondary hover:text-campus-text"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-campus-danger text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirm_password" className="label">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-campus-text-secondary z-10 pointer-events-none" />
              <input
                id="confirm_password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={formData.confirm_password}
                onChange={(e) => updateField('confirm_password', e.target.value)}
                className="input-field pl-11"
              />
            </div>
            {errors.confirm_password && <p className="text-campus-danger text-xs mt-1">{errors.confirm_password}</p>}
          </div>
        </div>

        {/* USN + Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="usn" className="label">USN (University Seat Number)</label>
            <div className="relative">
              <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-campus-text-secondary z-10 pointer-events-none" />
              <input
                id="usn"
                type="text"
                placeholder="e.g., 1RV21CS001"
                value={formData.usn}
                onChange={(e) => updateField('usn', e.target.value.toUpperCase())}
                className="input-field pl-11 uppercase"
              />
            </div>
            {errors.usn && <p className="text-campus-danger text-xs mt-1">{errors.usn}</p>}
          </div>

          {/* Department — modern searchable dropdown */}
          <div>
            <label htmlFor="department-selector" className="label">Department</label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-campus-text-secondary z-10 pointer-events-none" />
              <SearchableDropdown
                id="department-selector"
                options={DEPT_OPTIONS}
                value={formData.department}
                onChange={(val) => updateField('department', val)}
                placeholder="Select Department"
                searchPlaceholder="Search department..."
                showFullLabel
                noResultsText="No matching department found."
              />
            </div>
            {errors.department && <p className="text-campus-danger text-xs mt-1">{errors.department}</p>}
          </div>
        </div>

        {/* Semester + College */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Semester — modern searchable dropdown */}
          <div>
            <label htmlFor="semester-selector" className="label">Semester</label>
            <div className="relative">
              <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-campus-text-secondary z-10 pointer-events-none" />
              <SearchableDropdown
                id="semester-selector"
                options={SEM_OPTIONS}
                value={formData.semester > 0 ? String(formData.semester) : ''}
                onChange={(val) => updateField('semester', val ? parseInt(val) : 0)}
                placeholder="Select Semester"
                searchPlaceholder="Search semester..."
                noResultsText="Semester not found."
              />
            </div>
            {errors.semester && <p className="text-campus-danger text-xs mt-1">{errors.semester}</p>}
          </div>

          {/* College — searchable selector across all India */}
          <div>
            <label htmlFor="college-selector" className="label">College</label>
            <CollegeSelector
              id="college-selector"
              value={formData.college}
              onChange={(val) => updateField('college', val)}
              placeholder="Search colleges across India..."
            />
            {errors.college && <p className="text-campus-danger text-xs mt-1">{errors.college}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-campus-text-secondary">
          Already have an account?{' '}
          <Link href="/login" className="text-campus-purple font-semibold hover:text-campus-purple-accent transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
