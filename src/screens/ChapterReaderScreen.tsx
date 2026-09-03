import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { subjects } from '../data';
import { getTopics } from '../data/topics';
import {
  getTopicConcepts,
  getChapterMaterial,
} from '../data/studyMaterial';
import { science1Concepts } from '../data/science1Material';
import { getSupplementalContent } from '../data/subjectContent';
import { getExpandedConcepts } from '../data/expandedSubjects';
import { useTheme } from '../theme/ThemeProvider';

type MaterialTab =
  | 'Concepts'
  | 'Key Points'
  | 'Definitions'
  | 'Formulas'
  | 'Question Bank'
  | 'Previous Year';

const tabs: MaterialTab[] = [
  'Concepts',
  'Key Points',
  'Definitions',
  'Formulas',
  'Question Bank',
  'Previous Year',
];

export function ChapterReaderScreen({ route, navigation }: any) {
  const { colors } = useTheme();
  const subjectId = route.params?.subjectId;
  const chapterId = route.params?.chapterId;
  const subject = subjects.find((item) => item.id === subjectId);
  const chapter = subject?.chapters.find((item) => item.id === chapterId);
  const [tab, setTab] = useState<MaterialTab>('Concepts');

  if (!subject || !chapter) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Chapter not found.</Text>
      </View>
    );
  }

  const topics = getTopics(subject.id, chapter.id, chapter.title);
  const topicTitles = topics.map((item) => item.title);

  const science1 =
    subjectId === 'science1' ? science1Concepts[chapterId] || [] : [];

  const supplemental = getSupplementalContent(
    subject.id,
    chapter.id,
    chapter.title,
    topicTitles,
  );

  const expandedIds = [
    'history',
    'political',
    'geography',
    'english',
    'marathi',
    'hindi',
  ];

  const expanded = expandedIds.includes(subjectId)
    ? getExpandedConcepts(subjectId, chapterId, chapter.title, topics)
    : [];

  const base = getTopicConcepts(
    subject.id,
    chapter.id,
    chapter.title,
    topicTitles,
  );

  const concepts = supplemental.length
    ? supplemental
    : science1.length
      ? science1
      : expanded.length
        ? expanded
        : base;

  const material = concepts.length
    ? [
        {
          heading: 'Key Points',
          body: concepts.flatMap((item) => item.keyPoints),
        },
      ]
    : getChapterMaterial(
        subject.id,
        chapter.id,
        chapter.title,
        topicTitles,
      );

  const definitions = concepts.map(
    (item) => `${item.title}: ${item.concept}`,
  );

  const formulas = concepts
    .filter(
      (item) =>
        item.remember &&
        /[=²√]|formula|theorem|ratio|law/i.test(item.remember),
    )
    .map((item) => `${item.title} — ${item.remember}`);

  const askTutor = (topic: string) => {
    navigation.navigate('StudyTutor', {
      subjectId,
      chapterId,
      topic,
    });
  };

  const openNotebook = (topic: string) => {
    navigation.navigate('StudyNotebook', {
      subjectId,
      chapterId,
      topic,
    });
  };

  const renderConcepts = () => (
    <View>
      {concepts.map((item, index) => (
        <View
          key={`${item.title}-${index}`}
          style={[
            styles.concept,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.topicRow}>
            <View
              style={[
                styles.number,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <View style={styles.topicHeader}>
              <Text style={[styles.topicKind, { color: colors.primary }]}>
                CONCEPT
              </Text>
              <Text style={[styles.title, { color: colors.text }]}>
                {item.title}
              </Text>
            </View>
          </View>

          <Text style={[styles.body, { color: colors.text }]}>
            {item.concept}
          </Text>

          <Text style={[styles.label, { color: colors.primary }]}>
            KEY IDEAS
          </Text>
          {item.keyPoints.map((point) => (
            <Text
              key={point}
              style={[styles.bullet, { color: colors.muted }]}
            >
              • {point}
            </Text>
          ))}

          {item.example ? (
            <>
              <Text style={[styles.label, { color: colors.primary }]}>
                WORKED EXAMPLE
              </Text>
              <Text style={[styles.body, { color: colors.text }]}>
                {item.example}
              </Text>
            </>
          ) : null}

          <View
            style={[
              styles.remember,
              { backgroundColor: colors.background },
            ]}
          >
            <Text
              style={[styles.rememberText, { color: colors.primary }]}
            >
              🧠 Remember: {item.remember || 'Explain this concept in your own words.'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => askTutor(item.title)}
            style={[
              styles.askButton,
              {
                backgroundColor: colors.background,
                borderColor: colors.primary,
              },
            ]}
          >
            <Text style={[styles.askText, { color: colors.primary }]}>
              🤖 Ask Tutor about this topic
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => openNotebook(item.title)}
            style={[styles.notebookButton, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.notebookText}>📓 Open Study Notebook</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderKeyPoints = () => (
    <View>
      {material.flatMap((section) => section.body).map((point, index) => (
        <View
          key={`${point}-${index}`}
          style={[
            styles.point,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View
            style={[styles.smallNumber, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.numberText}>{index + 1}</Text>
          </View>
          <Text style={[styles.pointText, { color: colors.text }]}>
            {point}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderDefinitions = () => (
    <View>
      {definitions.map((definition, index) => (
        <View
          key={`${definition}-${index}`}
          style={[
            styles.definition,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.label, { color: colors.primary }]}>
            DEFINITION {index + 1}
          </Text>
          <Text style={[styles.body, { color: colors.text }]}>
            {definition}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderFormulas = () => {
    if (!formulas.length) {
      return (
        <View
          style={[
            styles.empty,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={styles.emptyIcon}>🧮</Text>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No formula sheet for this chapter
          </Text>
          <Text style={[styles.emptyBody, { color: colors.muted }]}>
            This chapter does not currently have formula-style revision points.
            Use Concepts and Key Points for revision.
          </Text>
        </View>
      );
    }

    return (
      <View>
        {formulas.map((formula, index) => (
          <View
            key={`${formula}-${index}`}
            style={[
              styles.formula,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.label, { color: colors.primary }]}>
              FORMULA / RULE
            </Text>
            <Text style={[styles.formulaText, { color: colors.text }]}>
              {formula}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderQuestionBank = () => (
    <View
      style={[
        styles.empty,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={styles.emptyIcon}>❓</Text>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        Chapter Question Bank
      </Text>
      <Text style={[styles.emptyBody, { color: colors.muted }]}>
        Practise MCQs, written answers, numericals and board-style questions
        from this chapter.
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() =>
          navigation.navigate('QuestionBank', {
            subjectId,
            chapterId,
          })
        }
      >
        <Text style={styles.buttonText}>Open Question Bank →</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPreviousYear = () => (
    <View
      style={[
        styles.empty,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={styles.emptyIcon}>📚</Text>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        Previous Year Questions
      </Text>
      <Text style={[styles.emptyBody, { color: colors.muted }]}>
        Verified official previous-year questions are shown only when a source
        has been reviewed and added. Current chapter practice remains original
        study content.
      </Text>
    </View>
  );

  const renderContent = () => {
    if (tab === 'Concepts') return renderConcepts();
    if (tab === 'Key Points') return renderKeyPoints();
    if (tab === 'Definitions') return renderDefinitions();
    if (tab === 'Formulas') return renderFormulas();
    if (tab === 'Question Bank') return renderQuestionBank();
    return renderPreviousYear();
  };

  return (
    <ScrollView
      style={[styles.bg, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.pad}
    >
      <Text style={[styles.kicker, { color: colors.primary }]}>
        STUDY MATERIAL 2.0
      </Text>
      <Text style={[styles.h, { color: colors.text }]}>
        {chapter.title}
      </Text>
      <Text style={[styles.sub, { color: colors.muted }]}>
        {subject.name} • Chapter {chapter.number} • {concepts.length} concepts
      </Text>

      <View
        style={[
          styles.notice,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.noticeText, { color: colors.muted }]}>
          ✨ Original study notes for understanding, revision and board
          preparation.
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
      >
        {tabs.map((item) => {
          const selected = tab === item;
          return (
            <TouchableOpacity
              key={item}
              onPress={() => setTab(item)}
              style={[
                styles.tab,
                {
                  backgroundColor: selected
                    ? colors.primary
                    : colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: selected ? '#FFFFFF' : colors.text },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {renderContent()}

      <View
        style={[
          styles.tip,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.tipTitle, { color: colors.text }]}>
          🎯 Smart revision
        </Text>
        <Text style={[styles.body, { color: colors.muted }]}>
          Study → close the notes → explain the idea aloud → practise → review
          mistakes.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  pad: { padding: 20, paddingBottom: 110 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  kicker: { fontSize: 11, fontWeight: '900', letterSpacing: 1.2 },
  h: { fontSize: 27, fontWeight: '900', marginTop: 6 },
  sub: { fontSize: 13, marginTop: 4 },
  notice: {
    padding: 11,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 14,
  },
  noticeText: { fontSize: 11, lineHeight: 17 },
  tabs: { gap: 8, paddingVertical: 14 },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  tabText: { fontSize: 12, fontWeight: '900' },
  concept: {
    borderRadius: 18,
    padding: 17,
    marginBottom: 12,
    borderWidth: 1,
  },
  topicRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  topicHeader: { flex: 1 },
  number: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
  topicKind: { fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  title: { fontSize: 17, fontWeight: '900', marginTop: 3 },
  body: { fontSize: 14, lineHeight: 21, marginTop: 12 },
  label: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 6,
  },
  bullet: { fontSize: 13, lineHeight: 20, marginBottom: 4 },
  remember: { padding: 11, borderRadius: 11, marginTop: 14 },
  rememberText: { fontSize: 11, fontWeight: '800', lineHeight: 17 },
  askButton: {
    padding: 11,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 12,
    alignItems: 'center',
  },
  askText: { fontSize: 11, fontWeight: '900' },
  notebookButton: {
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  notebookText: { color: '#FFFFFF', fontSize: 11, fontWeight: '900' },
  point: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 9,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
  },
  pointText: { flex: 1, fontSize: 14, lineHeight: 21 },
  definition: {
    borderRadius: 15,
    padding: 16,
    marginBottom: 9,
    borderWidth: 1,
  },
  formula: {
    borderRadius: 15,
    padding: 17,
    marginBottom: 10,
    borderWidth: 1,
  },
  formulaText: { fontSize: 17, fontWeight: '800', lineHeight: 24, marginTop: 7 },
  empty: {
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 4,
  },
  emptyIcon: { fontSize: 32 },
  emptyTitle: { fontSize: 18, fontWeight: '900', marginTop: 8, textAlign: 'center' },
  emptyBody: { fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 6 },
  button: { padding: 14, borderRadius: 13, marginTop: 16 },
  buttonText: { color: '#FFFFFF', fontWeight: '900', fontSize: 13 },
  tip: { borderRadius: 15, padding: 15, marginTop: 20, borderWidth: 1 },
  tipTitle: { fontSize: 14, fontWeight: '900', marginBottom: 5 },
});
