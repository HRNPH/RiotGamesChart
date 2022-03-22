const TIERS = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'];
const charts = document.getElementById('charts');

main();

async function main(){
    const response = await fetch('database.json');
    const database = await response.json();

    // Charts
    chartLine(database.numGamesPerRank, 'Average Games Played Per Rank');
    chartLine(database.accountLevelsPerRank, 'Average Account Level Per Rank');
    chartDonut(database.gameModeDistribution.silver, 'Game Mode Distribution');
}

function chartLine(data, title){
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: TIERS,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        }
    });
    charts.appendChild(canvas);
}

function chartDonut(data, title){
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Ranked Solo/Duo', 'Normal Draft', 'Normal Blind', 'ARAM', 'Ranked Flex', 'Other'],
            datasets: [{
                label: title,
                data: [0, 0, 0, 1, 0, 0],
                backgroundColor: [
                    '#D7263D',
                    '#02182B',
                    '#0197F6',
                    '#448FA3',
                    '#68C5DB',
                    '#CEECF3',
                ],
                borderColor: [
                    '#D7263D',
                    '#02182B',
                    '#0197F6',
                    '#448FA3',
                    '#68C5DB',
                    '#CEECF3',
                ],
                borderWidth: 1
            }]
        }
    });
    charts.appendChild(canvas);
}
