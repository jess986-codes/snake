import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import supabase from '../services/supabaseClient';

export default function AuthCallback(): React.ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return <div>Logging you in...</div>;
}
