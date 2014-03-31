function scoreGame(frames)
{
	var score = 0;
	var extraBalls = 0;
	for (var i = 0, j = frames.length; i < j; i++)
	{
		var frame = frames[i];
		score += frame.first;
		var priorFrame = i > 0 ? frames[i - 1] : null;
		var secondPriorFrame = i > 1 ? frames[i - 2] : null;
		// The frame one or two previous will get this score if a strike,
		// otherwise only the previous frame will get this score
		// (if a spare)
		if (priorFrame !== null && priorFrame.extraBalls > 0)
		{
			score += frame.first;
			priorFrame.extraBalls--;
		}
		if (secondPriorFrame !== null && secondPriorFrame.extraBalls > 0)
		{
			score += frame.first;
			secondPriorFrame.extraBalls--;
		}

		// Strike only scores once per frame
		if (frame.first === 10 && i !== 9)
		{
			frame.extraBalls = 2;
			continue;
		}

		score += frame.second;
		if (frame.first + frame.second === 10)
		{
			frame.extraBalls = 1;
		}
		// The frame one previous will get this added if it was a strike
		if (priorFrame !== null && priorFrame.extraBalls > 0)
		{
			score += frame.second;
			priorFrame.extraBalls--;
		}

		// Last frame with either a strike or a spare gets a third ball
		if (i === 9 && frame.first + frame.second >= 10 &&
				frame.third !== undefined)
		{
			score += frame.third;
		}
	}

	return score;
}
