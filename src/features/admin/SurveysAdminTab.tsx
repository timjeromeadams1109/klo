"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Eye,
  EyeOff,
  Power,
  PowerOff,
  BarChart3,
  Download,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  ClipboardList,
} from "lucide-react";

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------

interface Survey {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  show_on_homepage: boolean;
  response_count: number;
  created_at: string;
}

interface SurveySection {
  id: string;
  title: string;
  sort_order: number;
}

interface QuestionResult {
  question_id: string;
  question_text: string;
  question_type: "single" | "multi" | "open";
  section_id: string | null;
  options: string[];
  counts: Record<string, number>;
  open_responses: string[];
  total: number;
}

interface SurveyResults {
  sections: SurveySection[];
  questions: QuestionResult[];
  total_respondents: number;
  filtered: boolean;
}

// ------------------------------------------------------------
// Component
// ------------------------------------------------------------

export default function SurveysAdminTab() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [results, setResults] = useState<SurveyResults | null>(null);
  const [resultsLoading, setResultsLoading] = useState(false);

  // Cross-filter state
  const [filterQuestionId, setFilterQuestionId] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const fetchSurveys = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/surveys");
      if (res.ok) setSurveys(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSurveys();
  }, [fetchSurveys]);

  const fetchResults = useCallback(
    async (surveyId: string, fqId?: string, fv?: string) => {
      setResultsLoading(true);
      try {
        let url = `/api/admin/surveys/${surveyId}/results`;
        if (fqId && fv) {
          url += `?filter_question_id=${fqId}&filter_value=${encodeURIComponent(fv)}`;
        }
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          // Auto-expand all sections
          setExpandedSections(
            new Set((data.sections as SurveySection[]).map((s) => s.id))
          );
        }
      } finally {
        setResultsLoading(false);
      }
    },
    []
  );

  const toggleSurvey = async (
    id: string,
    field: "is_active" | "show_on_homepage",
    value: boolean
  ) => {
    await fetch(`/api/admin/surveys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    fetchSurveys();
    if (selectedSurvey?.id === id) {
      setSelectedSurvey((s) => (s ? { ...s, [field]: value } : s));
    }
  };

  const selectSurvey = (survey: Survey) => {
    setSelectedSurvey(survey);
    setFilterQuestionId("");
    setFilterValue("");
    fetchResults(survey.id);
  };

  const applyFilter = () => {
    if (selectedSurvey && filterQuestionId && filterValue) {
      fetchResults(selectedSurvey.id, filterQuestionId, filterValue);
    }
  };

  const clearFilter = () => {
    setFilterQuestionId("");
    setFilterValue("");
    if (selectedSurvey) fetchResults(selectedSurvey.id);
  };

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const exportCSV = () => {
    if (!results || !selectedSurvey) return;
    const rows: string[] = ["Question,Type,Option,Count,Percentage"];
    for (const q of results.questions) {
      if (q.question_type === "open") {
        for (const r of q.open_responses) {
          rows.push(
            `"${q.question_text}",open,"${r.replace(/"/g, '""')}",1,`
          );
        }
      } else {
        const opts = q.options.length > 0 ? q.options : Object.keys(q.counts);
        for (const opt of opts) {
          const count = q.counts[opt] || 0;
          const pct =
            q.total > 0 ? ((count / q.total) * 100).toFixed(1) : "0";
          rows.push(
            `"${q.question_text}",${q.question_type},"${opt}",${count},${pct}%`
          );
        }
      }
    }
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedSurvey.slug}-results.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // -- Survey list --
  if (!selectedSurvey) {
    return (
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-klo-text flex items-center gap-2">
          <ClipboardList size={20} />
          Surveys
        </h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-[#2764FF]/30 border-t-[#2764FF] rounded-full animate-spin" />
          </div>
        ) : surveys.length === 0 ? (
          <div className="glass rounded-2xl p-8 border border-white/5 text-center">
            <p className="text-klo-muted text-sm">
              No surveys yet. Surveys are created via the database seed.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {surveys.map((s) => (
              <div
                key={s.id}
                className="glass rounded-2xl p-4 border border-white/5"
              >
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => selectSurvey(s)}
                    className="flex-1 text-left min-w-0"
                  >
                    <p className="text-sm font-semibold text-klo-text truncate">
                      {s.title}
                    </p>
                    <p className="text-xs text-klo-muted mt-0.5">
                      {s.response_count} response
                      {s.response_count !== 1 ? "s" : ""} &middot;{" "}
                      {s.is_active ? (
                        <span className="text-emerald-400">Active</span>
                      ) : (
                        <span className="text-klo-muted/60">Inactive</span>
                      )}
                      {s.show_on_homepage && (
                        <span className="text-[#2764FF] ml-2">
                          On Homepage
                        </span>
                      )}
                    </p>
                  </button>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() =>
                        toggleSurvey(s.id, "is_active", !s.is_active)
                      }
                      className={`p-2 rounded-lg transition-colors ${
                        s.is_active
                          ? "text-emerald-400 hover:bg-emerald-500/10"
                          : "text-klo-muted hover:bg-white/5"
                      }`}
                      title={s.is_active ? "Deactivate survey" : "Activate survey"}
                    >
                      {s.is_active ? (
                        <Power size={16} />
                      ) : (
                        <PowerOff size={16} />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        toggleSurvey(
                          s.id,
                          "show_on_homepage",
                          !s.show_on_homepage
                        )
                      }
                      className={`p-2 rounded-lg transition-colors ${
                        s.show_on_homepage
                          ? "text-[#2764FF] hover:bg-[#2764FF]/10"
                          : "text-klo-muted hover:bg-white/5"
                      }`}
                      title={
                        s.show_on_homepage
                          ? "Hide from homepage"
                          : "Show on homepage"
                      }
                    >
                      {s.show_on_homepage ? (
                        <Eye size={16} />
                      ) : (
                        <EyeOff size={16} />
                      )}
                    </button>
                    <button
                      onClick={() => selectSurvey(s)}
                      className="p-2 rounded-lg text-klo-muted hover:text-klo-text hover:bg-white/5 transition-colors"
                      title="View results"
                    >
                      <BarChart3 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // -- Survey results view --
  // Get filterable questions (single-select only — for cross-tab)
  const filterableQuestions = (results?.questions ?? []).filter(
    (q) => q.question_type === "single" && q.options.length > 0
  );

  // Get selected filter question for its options
  const filterQuestion = filterableQuestions.find(
    (q) => q.question_id === filterQuestionId
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => {
              setSelectedSurvey(null);
              setResults(null);
            }}
            className="p-2 rounded-lg text-klo-muted hover:text-klo-text hover:bg-white/5 transition-colors shrink-0"
          >
            <X size={18} />
          </button>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-klo-text truncate">
              {selectedSurvey.title}
            </h2>
            <p className="text-xs text-klo-muted">
              {results?.total_respondents ?? 0} responses
              {results?.filtered && (
                <span className="text-amber-400 ml-2">(filtered)</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() =>
              toggleSurvey(
                selectedSurvey.id,
                "show_on_homepage",
                !selectedSurvey.show_on_homepage
              )
            }
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedSurvey.show_on_homepage
                ? "bg-[#2764FF]/10 text-[#2764FF]"
                : "bg-white/5 text-klo-muted hover:text-klo-text"
            }`}
          >
            {selectedSurvey.show_on_homepage ? (
              <Eye size={14} />
            ) : (
              <EyeOff size={14} />
            )}
            Homepage CTA
          </button>
          <button
            onClick={exportCSV}
            disabled={!results}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2764FF]/10 text-[#2764FF] hover:bg-[#2764FF]/20 transition-colors text-xs font-medium disabled:opacity-40"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Cross-filter */}
      <div className="glass rounded-2xl p-4 border border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={14} className="text-klo-muted" />
          <span className="text-xs font-semibold text-klo-text">
            Cross-Filter
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={filterQuestionId}
            onChange={(e) => {
              setFilterQuestionId(e.target.value);
              setFilterValue("");
            }}
            className="flex-1 bg-klo-dark border border-white/10 rounded-lg px-3 py-2 text-xs text-klo-text focus:outline-none focus:border-[#2764FF]/50"
          >
            <option value="">Filter by question...</option>
            {filterableQuestions.map((q, i) => (
              <option key={q.question_id} value={q.question_id}>
                Q{i + 1}: {q.question_text.slice(0, 60)}
                {q.question_text.length > 60 ? "..." : ""}
              </option>
            ))}
          </select>

          {filterQuestion && (
            <select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="flex-1 bg-klo-dark border border-white/10 rounded-lg px-3 py-2 text-xs text-klo-text focus:outline-none focus:border-[#2764FF]/50"
            >
              <option value="">Select answer...</option>
              {filterQuestion.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          <div className="flex gap-2">
            <button
              onClick={applyFilter}
              disabled={!filterQuestionId || !filterValue}
              className="px-4 py-2 rounded-lg bg-[#2764FF] text-white text-xs font-semibold hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Apply
            </button>
            {results?.filtered && (
              <button
                onClick={clearFilter}
                className="px-4 py-2 rounded-lg bg-white/5 text-klo-muted text-xs font-medium hover:text-klo-text transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {resultsLoading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-[#2764FF]/30 border-t-[#2764FF] rounded-full animate-spin" />
        </div>
      ) : results ? (
        <div className="space-y-4">
          {results.sections.map((section) => {
            const sectionQuestions = results.questions.filter(
              (q) => q.section_id === section.id
            );
            const isExpanded = expandedSections.has(section.id);

            return (
              <div
                key={section.id}
                className="glass rounded-2xl border border-white/5 overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
                >
                  <h3 className="text-sm font-semibold text-klo-text">
                    {section.title}
                  </h3>
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-klo-muted" />
                  ) : (
                    <ChevronDown size={16} className="text-klo-muted" />
                  )}
                </button>

                {isExpanded && (
                  <div className="divide-y divide-white/5">
                    {sectionQuestions.map((q) => (
                      <div key={q.question_id} className="p-4 space-y-3">
                        <p className="text-sm font-medium text-klo-text">
                          {q.question_text}
                        </p>
                        <p className="text-xs text-klo-muted">
                          {q.total} response{q.total !== 1 ? "s" : ""}
                        </p>

                        {q.question_type === "open" ? (
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {q.open_responses.length === 0 ? (
                              <p className="text-xs text-klo-muted/60 italic">
                                No responses yet
                              </p>
                            ) : (
                              q.open_responses.map((r, i) => (
                                <div
                                  key={i}
                                  className="text-xs text-klo-muted bg-klo-dark/50 rounded-lg p-3"
                                >
                                  &ldquo;{r}&rdquo;
                                </div>
                              ))
                            )}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {q.options.map((opt) => {
                              const count = q.counts[opt] || 0;
                              const pct =
                                q.total > 0
                                  ? Math.round((count / q.total) * 100)
                                  : 0;
                              const maxCount = Math.max(
                                ...Object.values(q.counts),
                                0
                              );
                              const isLeading =
                                count === maxCount && maxCount > 0;
                              return (
                                <div key={opt}>
                                  <div className="flex items-center justify-between text-xs mb-0.5">
                                    <span
                                      className={
                                        isLeading
                                          ? "text-klo-text font-semibold"
                                          : "text-klo-muted"
                                      }
                                    >
                                      {opt}
                                    </span>
                                    <span
                                      className={
                                        isLeading
                                          ? "text-klo-text font-semibold"
                                          : "text-klo-muted"
                                      }
                                    >
                                      {count} ({pct}%)
                                    </span>
                                  </div>
                                  <div className="w-full h-2 rounded-full bg-white/5">
                                    <div
                                      className="h-full rounded-full transition-all duration-500"
                                      style={{
                                        width: `${pct}%`,
                                        backgroundColor: isLeading
                                          ? "#D4A853"
                                          : "#2764FF",
                                        opacity: isLeading ? 1 : 0.6,
                                      }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Questions without a section */}
          {results.questions.filter((q) => !q.section_id).length > 0 && (
            <div className="glass rounded-2xl border border-white/5 p-4 space-y-4">
              <h3 className="text-sm font-semibold text-klo-text">
                Uncategorized
              </h3>
              {results.questions
                .filter((q) => !q.section_id)
                .map((q) => (
                  <div key={q.question_id} className="space-y-3">
                    <p className="text-sm font-medium text-klo-text">
                      {q.question_text}
                    </p>
                    <p className="text-xs text-klo-muted">
                      {q.total} response{q.total !== 1 ? "s" : ""}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
