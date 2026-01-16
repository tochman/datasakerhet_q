/**
 * Question flow logic for adaptive questionnaire
 * Determines which questions to show based on user type
 */

/**
 * Determines user type based on their answers
 * @param {Object} answers - User's answers to questions
 * @returns {string} User type identifier
 */
export const getUserType = (answers) => {
  // Offentlig verksamhet - Statlig
  if (answers.q1 === 'ja') {
    return 'OFFENTLIG_STATLIG';
  }
  
  // Offentlig verksamhet - Kommun/Region
  if (answers.q2 === 'ja') {
    return 'OFFENTLIG_KOMMUN';
  }
  
  // If Q1 is "nej", need to check Q2
  if (answers.q1 === 'nej' && answers.q2 === undefined) {
    return 'AFTER_Q1';
  }
  
  // Privat verksamhet
  if (answers.q1 === 'nej' && answers.q2 === 'nej') {
    // Inget svenskt säte = early exit
    if (answers.q3 === 'nej') {
      return 'PRIVAT_UTLAND';
    }
    
    if (answers.q3 === 'ja') {
      // NIS 2 omfattad
      const hasNIS2 = answers.q4 && answers.q4.length > 0;
      // Stort företag
      const isLarge = answers.q5 === 'ja';
      
      // NIS 2 eller stort företag
      if (hasNIS2 || isLarge) {
        return 'PRIVAT_STOR_NIS2';
      }
      
      // Litet företag
      if (answers.q4 !== undefined && answers.q5 === 'nej') {
        return 'PRIVAT_LITEN';
      }
      
      // Osäker på NIS2/storlek
      if (answers.q4 === 'vet_ej' || answers.q5 === 'vet_ej') {
        return 'PRIVAT_OSAKER';
      }
    }
    
    // Inte svarat på Q3 ännu
    return 'PRIVAT_OKAND';
  }
  
  // Inte svarat på Q1/Q2 ännu
  return 'INITIAL';
};

/**
 * Defines which questions should be shown for each user type
 * Key: User type
 * Value: Array of question numbers to display
 */
export const QUESTION_FLOWS = {
  // Initial state - only show Q1
  'INITIAL': [1],
  
  // After Q1 answered "nej", show Q2
  'AFTER_Q1': [1, 2],
  
  // Statlig myndighet - Q1 + undantag (Q13-Q17)
  'OFFENTLIG_STATLIG': [1, 13, 14, 15, 16, 17],
  
  // Kommun/Region - Q1-Q2 + undantag (Q13-Q17)
  'OFFENTLIG_KOMMUN': [1, 2, 13, 14, 15, 16, 17],
  
  // Privat, väntar på svenskt säte-svar
  'PRIVAT_OKAND': [1, 2, 3],
  
  // Privat utan svenskt säte - STOP efter Q3 (early exit)
  'PRIVAT_UTLAND': [1, 2, 3],
  
  // Litet privat företag - hoppar över Q9-Q11 (kritiska samhällsfunktioner, redan täckt av NIS 2)
  'PRIVAT_LITEN': [1, 2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 16, 17],
  
  // Stort företag/NIS 2 - hoppar över Q6 (utbildningsanordnare) och Q9-Q11
  'PRIVAT_STOR_NIS2': [1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 15, 16, 17],
  
  // Osäker - visa alla frågor för att vara säker
  'PRIVAT_OSAKER': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
};

/**
 * Gets the list of visible question IDs for the current user type
 * @param {string} userType - Current user type
 * @returns {Array<number>} Array of question numbers
 */
export const getVisibleQuestionIds = (userType) => {
  return QUESTION_FLOWS[userType] || [1];
};
