import type { UserRecording } from "@/lib/types";
import type { RecordingRepository } from "@/lib/repositories/types";

export const recordingRepo: RecordingRepository = {
  async list(): Promise<UserRecording[]> {
    return [];
  },
};
