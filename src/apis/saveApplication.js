import { supabaseOutpost } from "../utils/supabaseOutpostClient";

export const saveOutpostApplication = async (applicationData) => {
  const { error } = await supabaseOutpost
    .from("outpost_applications")
    .insert([applicationData]);

  if (error) {
    throw new Error(error.message);
  }
};
