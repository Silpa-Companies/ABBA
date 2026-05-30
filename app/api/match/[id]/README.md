A note about how to use this endpoint:

# Requirement: 

- Python 3.10+
- Have Claude CLI installed and a Claude pro/max account
- @anthropic-ai/claude-agent-sdk installed in package.json + node_modules

# Usage

Call the endpoint "http://localhost:3000/api/match/<client-uuid>". The endpint would return the matched list and the text. The server would log the tool uses and the thinking process of the agent. It would run your local agents and consume the tokens included in your Claude account, so no additional cost to worry about. 