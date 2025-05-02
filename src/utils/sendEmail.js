export const sendEmail = async ({ to, region, meals }) => {
  const body = {
    from: "saladcity@saladcitykorea.com",
    to,
    subject: "샐시 OUTPOST 신청 감사합니다!",
    html: `
      <div style="font-family: Pretendard, sans-serif; font-size: 15px;">
        <p>안녕하세요, 샐시팀입니다 🙌</p>
        <p><strong>${region}</strong>에서 <strong>${meals}식</strong> 신청해주셔서 감사합니다.</p>
        <p>현재 조건 확인 후 곧 다시 연락드릴게요!</p>
        <p>🍀 샐시 드림</p>
      </div>
    `,
  };

  const res = await fetch(process.env.REACT_APP_RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.ok;
};
