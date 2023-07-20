// Surveys and survey info
export const getQuestions = async (setIsLoading, setQuestions) => {
  try {
    setIsLoading(true);
    const fetchQuestions = await fetch(
      "http://localhost:3001/api/participant/ans"
    );
    const questions = await fetchQuestions.json();

    setQuestions(questions);
  } catch (err) {
    console.error(err.message);
  } finally {
    setIsLoading(false);
  }
};

export const getSurveys = async (setSurveys) => {
  try {
    const fetchQuestions = await fetch("http://localhost:3001/api/surveys");
    const questions = await fetchQuestions.json();

    setSurveys(questions);
  } catch (err) {
    console.error(err.message);
  }
};

export const postAnswers = async (userAnswers) => {
  try {
    const sendAnswers = await fetch("http://localhost:3001/api/participant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userAnswers),
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteSurvey = async (id) => {
  try {
    const deleteSurvey = await fetch(
      `http://localhost:3001/api/surveys/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {}
};

// Admins and admin info

export const getUsers = async (setUsers) => {
  try {
    const allUsers = await fetch("http://localhost:3001/api/admin");
    const users = await allUsers.json();

    setUsers(users);
  } catch (err) {
    console.error(err.message);
  }
};

export const createUser = async (userData) => {
  try {
    const newUser = await fetch("http://localhost:3001/api/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const loginUser = async (userData) => {
  try {
    const logUser = await fetch("http://localhost:3001/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  } catch (err) {
    console.error(err.message);
  }
};
