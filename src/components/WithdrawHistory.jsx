.status.pending {
  color: orange;
}

.status.approved {
  color: limegreen;
}

.status.rejected {
  color: crimson;
}

.history-header,
.history-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 8px 12px;
  border-bottom: 1px solid #333;
}

.history-header {
  font-weight: bold;
  background-color: #111;
  color: #ffd700;
}

.history-row {
  color: #eee;
}

.no-history {
  text-align: center;
  color: #aaa;
  padding: 20px;
}
