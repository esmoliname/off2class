import React, { createContext, useMemo, useState } from 'react';
import { CATALOG_COURSES, CATALOG_FILTERS } from '../utils/catalog';

export const CourseContext = createContext(null);

/**
 * Catalog state: filter selection + the course picked for enrolment.
 * Data lives in utils/catalog.js so new programs never touch components.
 */
export function CourseProvider({ children }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = useMemo(
    () =>
      activeFilter === 'all'
        ? CATALOG_COURSES
        : CATALOG_COURSES.filter((c) => c.category === activeFilter),
    [activeFilter]
  );

  const value = useMemo(
    () => ({
      filters: CATALOG_FILTERS,
      activeFilter,
      setActiveFilter,
      courses,
      selectedCourse,
      selectCourse: setSelectedCourse,
    }),
    [activeFilter, courses, selectedCourse]
  );

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}
