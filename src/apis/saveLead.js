import { supabaseMenu } from "../utils/supabaseMenuClient";

export const saveOutpostLead = async (leadData) => {
  const { error } = await supabaseMenu
    .from("outpost_leads")
    .insert([leadData]);

  if (error) {
    throw new Error(error.message);
  }
};
