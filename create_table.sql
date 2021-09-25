CREATE TABLE urls {
  id            VARCHAR(128)  PRIMARY KEY,
  original_url  VARCHAR(2048) NOT NULL,
  is_custom_url BOOLEAN       NOT NULL,
  visit_count   INT           NOT NULL DEFAULT(0) CHECK(visit_count >= 0),
  created_at    DATETIME      NOT NULL DEFAULT(DATETIME()),
  updated_at    DATETIME      NOT NULL DEFAULT(DATETIME()),
  deleted_at    DATETIME
};
