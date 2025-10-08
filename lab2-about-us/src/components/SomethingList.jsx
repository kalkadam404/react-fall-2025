import axios from "axios";
import React, { useEffect, useState } from "react";

export function SomethingList() {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayCount, setDisplayCount] = useState(5);
  const [initialLoading, setInitialLoading] = useState(true);
  const getDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const fetchVacancies = async () => {
    try {
      setInitialLoading(true);
      const response = await axios.get("https://remoteok.com/api");
      setVacancies(response.data);

      console.log("Fetched vacancies:", response.data);
    } catch (error) {
      console.error("Error fetching vacancies:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + 5);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const displayedVacancies = vacancies.slice(1, displayCount + 1);
  const hasMore = displayCount < vacancies.length - 1;

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
          <p className="text-slate-600">Loading vacancies...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen  py-12 px-4">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Vacancies</h1>
          <p className="text-slate-600">
            Showing {displayedVacancies.length} of {vacancies.length - 1} open
            positions
          </p>
        </div>

        <div className="space-y-4">
          {displayedVacancies.map((vacancy) => (
            <div
              key={vacancy.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-slate-200 hover:border-blue-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {vacancy.position}
                  </h2>
                  <div className="flex items-center gap-2 text-slate-600 mb-3">
                    <i className="fas fa-building text-sm"></i>
                    <span className="font-medium">{vacancy.company}</span>
                  </div>
                </div>
                <span className="text-sm text-slate-500 whitespace-nowrap ml-4">
                  {getDate(vacancy.date)}
                </span>
              </div>

              <p className="text-slate-600 mb-4 leading-relaxed">
                {vacancy.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {vacancy.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-slate-400"></i>
                  <span>{vacancy.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <i className="fas fa-dollar-sign text-slate-400"></i>
                  <span className="font-semibold text-slate-700">
                    {vacancy.salary_min}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-slate-100">
                <button className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow">
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-8 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Loading...
                </>
              ) : (
                <>
                  <i className="fas fa-chevron-down"></i>
                  Load More Vacancies
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
