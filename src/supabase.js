import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://elvzpyksawrpdzfdnwsj.supabase.co';
const supabaseKey = 'sb_publishable_Qvje6uGCD42PcmnFypO89g__TuoqTxR';

export const supabase = createClient(supabaseUrl, supabaseKey);
