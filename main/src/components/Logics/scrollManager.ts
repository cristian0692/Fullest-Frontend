export const disableScroll = () => {
  document.body.classList.add("remove-scrolling");
};

export const enableScroll = () => {
  document.body.classList.remove("remove-scrolling");
};
