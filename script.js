document.addEventListener('DOMContentLoaded', () => {
    const teams = [
        'Ajax', 'PSV', 'Utrecht', 'AZ', 'Twente', 
        'Feyenoord', 'Sparta Rotterdam', 'GA Eagles', 
        'Groningen', 'Heracles', 'Willem II', 'NEC', 
        'PEC', 'Fortuna', 'Heerenveen', 'NAC', 'RKC'
    ];

    const teamLogos = {
        'Ajax': 'ajax_logo.png',
        'PSV': 'psv_logo.png',
        'Utrecht': 'utrecht_logo.png',
        'AZ': 'az_logo.png',
        'Twente': 'twente_logo.png',
        'Feyenoord': 'feyenoord_logo.png',
        'Sparta Rotterdam': 'sparta_logo.png',
        'GA Eagles': 'gaeagles_logo.png',
        'Groningen': 'groningen_logo.png',
        'Heracles': 'heracles_logo.png',
        'Willem II': 'willemii_logo.png',
        'NEC': 'nec_logo.png',
        'PEC': 'pec_logo.png',
        'Fortuna': 'fortuna_logo.png',
        'Heerenveen': 'heerenveen_logo.png',
        'NAC': 'nac_logo.png',
        'RKC': 'rkc_logo.png'
    };

    const teamScores = teams.map(team => ({
        name: team,
        won: 0,
        drawn: 0,
        lost: 0,
        points: 0
    }));

    const matches = [];
    const fields = [
        { name: 'Johan Cruijff ArenA', link: 'https://maps.app.goo.gl/ZfmTNgytqa95zug66' },
        { name: 'Philips Stadion', link: 'https://maps.app.goo.gl/VGEyRXKLDVL83oYm6' },
        { name: 'Stadion Galgenwaard', link: 'https://maps.app.goo.gl/qFtXE5bjXeX3jaRJA' },
        { name: 'AFAS Stadion', link: 'https://maps.app.goo.gl/oYeKN5rWcZWTBw3r7' },
        { name: 'Grolsch Veste', link: 'https://maps.app.goo.gl/rBLdwPoUAK6j34Cr5' },
        { name: 'De Kuip', link: 'https://maps.app.goo.gl/ATVZaNNxtqqNcyoF9' },
        { name: 'Sparta Stadion Het Kasteel', link: 'https://maps.app.goo.gl/tDYaxvKA6u9yHPpr5' },
        { name: 'De Adelaarshorst', link: 'https://maps.app.goo.gl/rYuhCgmyQU2C6qLM9' },
        { name: 'Euroborg', link: 'https://maps.app.goo.gl/mmAXhRFtytv4jeEF7' },
        { name: 'Asito stadion', link: 'https://maps.app.goo.gl/tWiZqa2QquiSzojP7' },
        { name: 'Koning Willem II Stadion', link: 'https://maps.app.goo.gl/Dt9uW6U1JSqf3eye6' },
        { name: 'Goffertstadion', link: 'https://maps.app.goo.gl/DRTTFYyfnaywAeyA8' },
        { name: 'MAC³PARK Stadion', link: 'https://maps.app.goo.gl/GuV8bUThsJMJJoHx7' },
        { name: 'Fortuna Sittard', link: 'https://maps.app.goo.gl/gHUVkEo9zo1fNycg7' },
        { name: 'Abe Lenstra Stadion', link: 'https://maps.app.goo.gl/MkpuwBZVaYvzSXfH7' },
        { name: 'Rat Verlegh Stadion', link: 'https://maps.app.goo.gl/G8KbJkS2uWxwKMXj9' },
        { name: 'Mandemakers Stadion', link: 'https://maps.app.goo.gl/Q1Dwi69HH96eGtEm7' }
    ];

    function generateMatches() {
        for (let i = 0; i < teams.length; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                matches.push({
                    team1: teams[i],
                    team2: teams[j],
                    field: fields[i].name,
                    fieldLink: fields[i].link,
                    result: ''
                });
            }
        }
    }

    generateMatches();
    shuffle(matches);

    const matchSchedule = document.getElementById('match-schedule').querySelector('tbody');
    const standings = document.getElementById('team-standings').querySelector('tbody');
    const liveFeed = document.getElementById('live-updates');
    const confettiContainer = document.getElementById('confetti');

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function generateResult(match) {
        let goalsTeam1 = Math.floor(Math.random() * 6); 
        let goalsTeam2 = Math.floor(Math.random() * 6); 

        match.result = `${goalsTeam1} - ${goalsTeam2}`;

        const team1 = teamScores.find(t => t.name === match.team1);
        const team2 = teamScores.find(t => t.name === match.team2);

        if (goalsTeam1 > goalsTeam2) {
            team1.won++;
            team2.lost++;
            team1.points += 3;
        } else if (goalsTeam1 < goalsTeam2) {
            team2.won++;
            team1.lost++;
            team2.points += 3;
        } else {
            team1.drawn++;
            team2.drawn++;
            team1.points += 1;
            team2.points += 1;
        }
    }

    matches.forEach((match, index) => {
        let row = `<tr id="match-${index}">
                    <td>Wedstrijd ${index + 1}</td>
                    <td><img src="images/${teamLogos[match.team1]}" alt="${match.team1}" class="team-logo"> ${match.team1}</td>
                    <td><img src="images/${teamLogos[match.team2]}" alt="${match.team2}" class="team-logo"> ${match.team2}</td>
                    <td><a href="${match.fieldLink}" target="_blank">${match.field}</a></td>
                    <td id="time-${index}">Nog niet begonnen</td>
                    <td id="result-${index}">Nog niet gespeeld</td>
                   </tr>`;
        matchSchedule.innerHTML += row;
    });

    function updateStandings() {
        standings.innerHTML = '';
        teamScores.sort((a, b) => b.points - a.points);
    
        teamScores.forEach((team, index) => {
            let row = `<tr>
                        <td class="ranking">${index + 1}.</td>
                        <td class="team-info">
                            <img src="images/${teamLogos[team.name]}" alt="${team.name}" class="team-logo"> 
                            ${team.name}
                        </td>
                        <td>${team.won}</td>
                        <td>${team.drawn}</td>
                        <td>${team.lost}</td>
                        <td>${team.points}</td>
                       </tr>`;
            standings.innerHTML += row;
        });
    
        // Trigger confetti effect if all matches are completed
        if (teamScores.every(team => team.points > 0)) {
            showConfetti();
        }
    }       

    function showConfetti() {
        // Show confetti effect
        confettiContainer.style.display = 'block';
        setTimeout(() => {
            confettiContainer.style.display = 'none';

            // Get winning team
            const winner = teamScores[0];
            const winnerMessage = document.getElementById('winner-message');
            winnerMessage.innerHTML = `<img src="images/${teamLogos[winner.name]}" alt="${winner.name}" class="team-logo"> ${winner.name} is the winner!`;
            winnerMessage.style.display = 'block';

            setTimeout(() => {
                winnerMessage.style.display = 'none';
            }, 5000);
        }, 5000); // Show confetti for 5 seconds
    }

    function simulateMatches() {
        let currentMatch = 0;

        function playNextMatch() {
            if (currentMatch >= matches.length) return;

            let match = matches[currentMatch];
            const matchTime = new Date();
            matchTime.setMinutes(matchTime.getMinutes() + currentMatch * 3);
            document.getElementById(`time-${currentMatch}`).textContent = matchTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            liveFeed.innerHTML = `Wedstrijd ${currentMatch + 1} tussen <strong><img src="images/${teamLogos[match.team1]}" alt="${match.team1}" class="team-logo">${match.team1}</strong> en <strong><img src="images/${teamLogos[match.team2]}" alt="${match.team2}" class="team-logo">${match.team2}</strong> begint nu in de <a href="${match.fieldLink}" target="_blank">${match.field}</a>.`;
            
            setTimeout(() => {
                generateResult(match);
                const resultMessage = `${match.team1} vs ${match.team2}: ${match.result}`;
                document.getElementById(`result-${currentMatch}`).textContent = resultMessage;
                liveFeed.innerHTML += `<br>${resultMessage}`;

                updateStandings();
                currentMatch++;
                setTimeout(playNextMatch, 0);
            }, 60000);
        }

        playNextMatch();
    }

    updateStandings();
    simulateMatches();
});

