const ASCII_SUBJECT_REGEX = /^[\x00-\x7F]+$/;

/**
 * commitlint rule that ensures the subject uses ASCII characters only,
 * which increases the chance that the message is written in English.
 */
const subjectAsciiOnly = ({ subject = "" }) => {
  const isAsciiOnly = ASCII_SUBJECT_REGEX.test(subject.trim());
  return [
    isAsciiOnly,
    "subject must contain only ASCII characters so that commits stay in English",
  ];
};

module.exports = {
  rules: {
    "subject-ascii-only": subjectAsciiOnly,
  },
};
