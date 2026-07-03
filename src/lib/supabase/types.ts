export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string
          goal: string | null
          id: string
          phone: string
          source_locale: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name: string
          goal?: string | null
          id?: string
          phone: string
          source_locale?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string
          goal?: string | null
          id?: string
          phone?: string
          source_locale?: string | null
          status?: string | null
        }
        Relationships: []
      }
      course_categories: {
        Row: {
          id: string
          name_en: string
          name_vi: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          id?: string
          name_en: string
          name_vi: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          id?: string
          name_en?: string
          name_vi?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          category_id: string | null
          cover_image_url: string | null
          created_at: string | null
          description_en: string | null
          description_vi: string | null
          duration_weeks: number | null
          id: string
          is_published: boolean | null
          level_tag: string | null
          price_note: string | null
          slug: string
          sort_order: number | null
          title_en: string
          title_vi: string
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description_en?: string | null
          description_vi?: string | null
          duration_weeks?: number | null
          id?: string
          is_published?: boolean | null
          level_tag?: string | null
          price_note?: string | null
          slug: string
          sort_order?: number | null
          title_en: string
          title_vi: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description_en?: string | null
          description_vi?: string | null
          duration_weeks?: number | null
          id?: string
          is_published?: boolean | null
          level_tag?: string | null
          price_note?: string | null
          slug?: string
          sort_order?: number | null
          title_en?: string
          title_vi?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer_en: string
          answer_vi: string
          id: string
          is_published: boolean | null
          page_scope: string | null
          question_en: string
          question_vi: string
          sort_order: number | null
        }
        Insert: {
          answer_en: string
          answer_vi: string
          id?: string
          is_published?: boolean | null
          page_scope?: string | null
          question_en: string
          question_vi: string
          sort_order?: number | null
        }
        Update: {
          answer_en?: string
          answer_vi?: string
          id?: string
          is_published?: boolean | null
          page_scope?: string | null
          question_en?: string
          question_vi?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      page_metadata: {
        Row: {
          canonical_url: string | null
          created_at: string | null
          description: string
          id: string
          is_active: boolean | null
          keywords: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          og_type: string | null
          page_name: string
          page_path: string
          robots: string | null
          title: string
          twitter_card: string | null
          twitter_description: string | null
          twitter_image: string | null
          twitter_title: string | null
          updated_at: string | null
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string | null
          description: string
          id?: string
          is_active?: boolean | null
          keywords?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          og_type?: string | null
          page_name: string
          page_path: string
          robots?: string | null
          title: string
          twitter_card?: string | null
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string | null
        }
        Update: {
          canonical_url?: string | null
          created_at?: string | null
          description?: string
          id?: string
          is_active?: boolean | null
          keywords?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          og_type?: string | null
          page_name?: string
          page_path?: string
          robots?: string | null
          title?: string
          twitter_card?: string | null
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          key: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      teacher_profile: {
        Row: {
          avatar_url: string | null
          bio_en: string | null
          bio_vi: string | null
          certifications: string[] | null
          created_at: string | null
          full_name: string
          id: string
          is_active: boolean | null
          slug: string | null
          title: string | null
          updated_at: string | null
          years_experience: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio_en?: string | null
          bio_vi?: string | null
          certifications?: string[] | null
          created_at?: string | null
          full_name: string
          id?: string
          is_active?: boolean | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio_en?: string | null
          bio_vi?: string | null
          certifications?: string[] | null
          created_at?: string | null
          full_name?: string
          id?: string
          is_active?: boolean | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          content_en: string
          content_vi: string
          id: string
          is_published: boolean | null
          rating: number | null
          sort_order: number | null
          student_name: string
        }
        Insert: {
          avatar_url?: string | null
          content_en: string
          content_vi: string
          id?: string
          is_published?: boolean | null
          rating?: number | null
          sort_order?: number | null
          student_name: string
        }
        Update: {
          avatar_url?: string | null
          content_en?: string
          content_vi?: string
          id?: string
          is_published?: boolean | null
          rating?: number | null
          sort_order?: number | null
          student_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
