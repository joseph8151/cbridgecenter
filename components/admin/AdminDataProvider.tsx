"use client";

// Shared in-session admin state — Demo Mode.
//
// Question Bank, Mock Test Builder, Academy Courses, and Coupons all need to
// feel connected while an admin clicks around (add a question, see it show
// up when building a mock test; change a course price, see it everywhere
// that course is referenced). There's no write API yet, so this Context is
// the "database" for the admin session: it seeds from the same static data
// files the student site reads, and every admin page mutates it through the
// hooks below instead of local per-page state. Nothing here survives a page
// reload — that's the honest boundary of a mock backend.

import { createContext, useContext, useState, ReactNode } from "react";
import { BankQuestion, CourseProduct } from "@/lib/types";
import { BANK_QUESTIONS } from "@/lib/data/questionBank";
import { MockTestDefinition, MOCK_TEST_DEFINITIONS } from "@/lib/data/mockTests";
import { COURSES } from "@/lib/data/academy";
import { Coupon, COUPONS } from "@/lib/data/admin";
import { PlanTemplate, PLAN_TEMPLATES } from "@/lib/data/planTemplates";

interface AdminDataContextValue {
  questions: BankQuestion[];
  addQuestion: (q: BankQuestion) => void;
  updateQuestion: (id: string, patch: Partial<BankQuestion>) => void;
  deleteQuestion: (id: string) => void;

  mockTests: MockTestDefinition[];
  addMockTest: (t: MockTestDefinition) => void;
  updateMockTest: (id: string, patch: Partial<MockTestDefinition>) => void;

  courses: CourseProduct[];
  updateCourse: (id: string, patch: Partial<CourseProduct>) => void;

  coupons: Coupon[];
  addCoupon: (c: Coupon) => void;

  planTemplates: PlanTemplate[];
  updatePlanTemplate: (id: string, patch: Partial<PlanTemplate>) => void;
}

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<BankQuestion[]>(BANK_QUESTIONS);
  const [mockTests, setMockTests] = useState<MockTestDefinition[]>(MOCK_TEST_DEFINITIONS);
  const [courses, setCourses] = useState<CourseProduct[]>(COURSES);
  const [coupons, setCoupons] = useState<Coupon[]>(COUPONS);
  const [planTemplates, setPlanTemplates] = useState<PlanTemplate[]>(PLAN_TEMPLATES);

  const value: AdminDataContextValue = {
    questions,
    addQuestion: (q) => setQuestions((qs) => [q, ...qs]),
    updateQuestion: (id, patch) =>
      setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...patch, updatedAt: new Date().toISOString() } : q))),
    deleteQuestion: (id) => setQuestions((qs) => qs.filter((q) => q.id !== id)),

    mockTests,
    addMockTest: (t) => setMockTests((ts) => [t, ...ts]),
    updateMockTest: (id, patch) =>
      setMockTests((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t))),

    courses,
    updateCourse: (id, patch) =>
      setCourses((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c))),

    coupons,
    addCoupon: (c) => setCoupons((cs) => [c, ...cs]),

    planTemplates,
    updatePlanTemplate: (id, patch) =>
      setPlanTemplates((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t))),
  };

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used within AdminDataProvider");
  return ctx;
}
