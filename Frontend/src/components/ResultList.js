import React from "react";
import "./ResultList.css";

function ResultList({ results, isLoading }) {
  if (isLoading) {
    return (
      <div className="results-loading">
        <div className="loading-spinner"></div>
        <p>Loading results...</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="results-empty">
        <div className="empty-icon">🔍</div>
        <h4>No Results Found</h4>
        <p>Try adjusting your search criteria or browse all available data.</p>
      </div>
    );
  }

  // Ensure results is an array
  const resultsArray = Array.isArray(results) ? results : Object.values(results);

  return (
    <div className="result-list-container">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>🏠 Home Team</th>
              <th>✈️ Away Team</th>
              <th>🏟️ Venue</th>
              <th>🏠 Home Score</th>
              <th>✈️ Away Score</th>
              <th>📅 Week</th>
              <th>📆 Date</th>
              <th>👥 Attendance</th>
            </tr>
          </thead>
          <tbody>
            {resultsArray.map((result, index) => (
              <tr key={result.id || index}>
                <td>
                  <strong className="team-name">{result.home_team_name || "N/A"}</strong>
                </td>
                <td>
                  <strong className="team-name">{result.away_team_name || "N/A"}</strong>
                </td>
                <td>{result.venue || "N/A"}</td>
                <td className="score-cell">
                  <span className="score">{result.home_score ?? "N/A"}</span>
                </td>
                <td className="score-cell">
                  <span className="score">{result.away_score ?? "N/A"}</span>
                </td>
                <td className="text-center">
                  <span className="week-badge">Week {result.week || "N/A"}</span>
                </td>
                <td className="text-center">
                  {result.game_date ? new Date(result.game_date).toLocaleDateString() : "N/A"}
                </td>
                <td className="text-center">
                  {result.attendance ? result.attendance.toLocaleString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="results-summary">
        <p>
          Showing <strong>{resultsArray.length}</strong> result{resultsArray.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}

export default ResultList;