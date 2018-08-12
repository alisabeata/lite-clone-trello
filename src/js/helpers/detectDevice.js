export default function detectDevice() {
  const isMobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

  return {
    isMobile,
    clickEvent: isMobile ? 'touchstart' : 'click'
  };
};