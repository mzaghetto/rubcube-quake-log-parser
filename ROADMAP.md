## Story 1
As a game administrator, I want to have game statistics, including the total number of deaths, deaths by cause, and deaths caused by `<world>` to understand player difficulty.

#### Functional Requirements
  - [x] It must be possible to get game statistics.
  - [x] It must record the total number of deaths in each game.
  - [x] It must categorize deaths by cause (MOD_UNKNOWN, MOD_SHOTGUN, MOD_GAUNTLET, MOD_MACHINEGUN, etc.).

#### Business Rules
  - [x] Only administrators will have access to the statistics.
  - [x] The statistics will be classified by game.
  - [x] It will be possible to get all statistics for all games.

## Story 2
As a player, I want to see the ranking of each match to know the winner and my performance.

Acceptance Criteria:
Players start with zero points.
For each kill, the player gains one point.
For each death by the world, the player loses one point.
Negative scores are allowed.
`<world>` should not be included in the player rankings.
Players can change their name mid-match, but only the last name should be considered in the ranking.

#### Functional Requirements
  - [x] It must be possible to view the match ranking.

#### Business Rules
  - [x] Each player will have their own visibility.
  - [x] The rankings will be classified by game.
  - [x] The player's most recent name must be displayed in the rankings list.
  - [x] Negative scores must be allowed.
  - [x] World should not be shown in the ranking.

## Story 3
As a game administrator, I want to be able to consult the statistics of a specific game or all games in a structured way through an API to create a visualization for the players.

#### Functional Requirements
  - [x] It must be possible to get game statistics.

#### Business Rules
  - [x] Only the administrator should have access.
  - [x] Statistics for all matches can be retrieved.
  - [x] Statistics can be retrieved by match ID.
  - [x] World should not be shown in the ranking.

## General Rules
Below are the general rules regardless of the story.

#### Business Rules (General)
  - [x] Game statistics will come from a .log file.
  - [x] Each match/game is started with `InitGame`.
  - [x] Each match/game is finished by reading one line before the next `InitGame`.

#### Non-Functional Rules
  - [x] Run via Docker.
  - [x] Run locally.

## With more time, come more responsibilities *Programming's Uncle Ben (Spider-man)
At this moment, the focus was on implementing the rules to meet the basic requirements of the application and also to demonstrate some of my knowledge of code/architecture.

Of course, the application can be improved in many other ways, but given the time, this is the result.

Below are some things that could be implemented with more time.

#### Future Implementations (with more implementation time)
  - [ ] Route for user registration.
  - [ ] Route to change user type (administrator or player).
  - [ ] Authentication route (JWT).
  - [ ] Check if the submitted log has ever been sent to the server before (duplicate submission).
  - [ ] The application data needs to be persisted in a database [MongoDB, PostgreSQL, etc.].
  - [ ] Add Swagger for route documentation.
  - [ ] E2E Tests.
  - [ ] Docker Compose (to run the database + application together).
