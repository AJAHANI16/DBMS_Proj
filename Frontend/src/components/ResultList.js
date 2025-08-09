import React from "react";
import "./ResultList.css";

function ResultList({ results, venues }) {
  if (!results || results.length === 0) {
    return (
      <div className="no-results">
        <p>No game results found. Try adjusting your search criteria.</p>
      </div>
    );
  }

  // Ensure results is an array
  const resultsArray = Array.isArray(results) ? results : Object.values(results);

  return (
    <div className="result-list-container">
      <h3 className="results-title">Game Results</h3>
      <div className="results-table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Venue</th>
              <th>Score</th>
              <th>Week</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {resultsArray.map((result, index) => (
              <tr key={result.id || index} className="result-row">
                <td className="team-cell home-team">
                  <span className="team-name">{result.home_team_name || "TBD"}</span>
                </td>
                <td className="team-cell away-team">
                  <span className="team-name">{result.away_team_name || "TBD"}</span>
                </td>
                <td className="venue-cell">{result.venue || "TBD"}</td>
                <td className="score-cell">
                  <div className="score-display">
                    <span className="home-score">{result.home_score ?? "-"}</span>
                    <span className="score-separator">-</span>
                    <span className="away-score">{result.away_score ?? "-"}</span>
                  </div>
                </td>
                <td className="week-cell">
                  <span className="week-badge">Week {result.week || "TBD"}</span>
                </td>
                <td className="date-cell">
                  {result.game_date ? new Date(result.game_date).toLocaleDateString() : "TBD"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="results-summary">
        <span className="results-count">
          {resultsArray.length} game{resultsArray.length !== 1 ? 's' : ''} found
        </span>
      </div>
    </div>
  );
}

export default ResultList;