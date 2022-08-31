<?php require_once 'private/initialize.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quran Player</title>
    <link rel="shortcut icon" href="assets/logos/main.png" type="image/x-icon">
    <link rel="stylesheet" href="src/css/bootstrap.min.css">
    <link rel="stylesheet" href="src/css/all.min.css">
    <link rel="stylesheet" href="src/css/main.css">
</head>

<body data-reader>
    <div class="main-frame">
        <div class="readers-list">
            <?php foreach ($readers as $reader) : ?>
            <div class="reader-elm d-flex justify-content-center align-items-center text-white text-center"
                style="cursor: pointer;" data-reader="<?php echo $reader; ?>">
                <div class="reader-elm__name h3"><?php echo $reader ?></div>
            </div>
            <?php endforeach; ?>
        </div>
        <div class="audio-playlist">
            <?php foreach ($suras_en as $index => $sura) : ?>
            <div class="audio-elm d-flex justify-content-between align-items-center text-white text-center"
                style="cursor: pointer;" id="<?php echo sprintf("%03d", ($index + 1)); ?>"
                data-name="<?php echo $sura; ?>">
                <div class="audio-elm__play-btn" style="width: 15%;"><i class="fas fa-play-circle fa-3x"></i>
                </div>
                <div class="audio-elm__name h3" style="width: 85%;"><?php echo $sura ?></div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
    <div class="player-controller__container fixed-bottom py-3 text-white d-flex align-items-center">
        <div class="player-controller__controls w-100 d-flex flex-column justify-content-between align-items-center">
            <div class="top w-100 row text-center mb-2">
                <div class="player-controller__info col-4 col-md-2">
                    <div class="player-controller__info-name"></div>
                    <div class="player-controller__info-reader"></div>
                </div>
                <div class="player-controller__controls-actions col-8">
                    <button id="previous-btn" class="btn"><i class="fas fa-backward text-white"
                            style="font-size: 20px;"></i></button>
                    <button id="play-btn" class="btn"><i class="fas fa-play-circle text-white"
                            style="font-size: 35px;"></i></button>
                    <button id="next-btn" class="btn"><i class="fas fa-forward text-white"
                            style="font-size: 20px;"></i></button>
                </div>
                <div class="player-controller__controls-volume d-none d-md-flex align-items-center col-2">
                    <i class="fas fa-volume-up fa-md text-white mr-3"></i>
                    <input type="range" name="volume" id="volume" min=0 max=1 step=0.05 class="w-100">
                </div>
            </div>
            <div class="bottom w-100 row d-flex justify-content-around">
                <div class="player-controller__controls-timeline d-flex justify-content-around align-items-center">
                    <div class="player-controller__timeline-current">0:00</div>
                    <div class="player-controller__timeline mx-3">
                        <div class="player-controller__timeline-progress"></div>
                    </div>
                    <div class="player-controller__timeline-duration"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="src/js/jquery.min.js"></script>
    <script src="src/js/bootstrap.min.js"></script>
    <script src="src/js/main.js"></script>
</body>

</html>