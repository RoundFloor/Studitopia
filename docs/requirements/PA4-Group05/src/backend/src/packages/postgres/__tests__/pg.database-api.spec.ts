vi.mock('pg', () => ({
  DatabaseError: vi.fn(),
  Pool: vi.fn(function () {
    return {
      query: (query: string, params: unknown[]) =>
        PoolMock.query(query, params),
      connect: vi.fn(),
      end: vi.fn(),
    };
  }),
}));

vi.mock('pg-protocol', async (importOriginal) => {
  const actual = await importOriginal<typeof import('pg-protocol')>();

  return {
    ...actual,
    DatabaseError: vi.fn(function (code: number) {
      return Object.assign(new Error(''), {
        code: code,
      });
    }),
  };
});

import { DatabaseError } from 'pg';
import { PostgresService } from '../pg.service.js';
import { EnvironmentService } from '../../environment/environment.service.js';
import { PoolMock } from './pool.mock.js';

const rowCases = [
  {
    name: 'getTag',
    call: (service: PostgresService) => service.getTag('subject'),
    sql: 'SELECT * FROM STUDITOPIA.GET_TAG($1);',
    params: ['subject'],
    row: { id: 1, name: 'Database', num_tag: 2, num_post: 3, icon: 4, description: 'DB course' },
    expected: { id: 1, name: 'Database', num_tag: 2, num_post: 3, icon: 4, description: 'DB course' },
  },
  {
    name: 'getTagById',
    call: (service: PostgresService) => service.getTagById(1),
    sql: 'SELECT * FROM STUDITOPIA.GET_TAG_BY_ID($1);',
    params: [1],
    row: {
      id: 1,
      name: 'Database',
      num_tag: 2,
      num_post: 3,
      icon: 4,
      description: 'DB course',
      category: 'subject',
      created_time: new Date('2026-01-01T00:00:00Z'),
    },
    expected: {
      id: 1,
      name: 'Database',
      num_tag: 2,
      num_post: 3,
      icon: 4,
      description: 'DB course',
      category: 'subject',
      created_time: new Date('2026-01-01T00:00:00Z'),
    },
  },
  {
    name: 'getTagsById',
    call: (service: PostgresService) => service.getTagsById([1, 2]),
    sql: 'SELECT * FROM STUDITOPIA.GET_TAGS_BY_ID($1);',
    params: [[1, 2]],
    row: { id: 1, name: 'Database', category: 'subject' },
    expected: { id: 1, name: 'Database', category: 'subject' },
  },
  {
    name: 'getTagByName',
    call: (service: PostgresService) => service.getTagByName('database'),
    sql: 'SELECT * FROM STUDITOPIA.GET_TAG_BY_NAME($1);',
    params: ['database'],
    row: {
      id: 1,
      name: 'Database',
      num_tag: 2,
      num_post: 3,
      icon: 4,
      description: 'DB course',
      category: 'subject',
      created_time: new Date('2026-01-01T00:00:00Z'),
    },
    expected: {
      id: 1,
      name: 'Database',
      num_tag: 2,
      num_post: 3,
      icon: 4,
      description: 'DB course',
      category: 'subject',
      created_time: new Date('2026-01-01T00:00:00Z'),
    },
  },
  {
    name: 'getTagByEmail',
    call: (service: PostgresService) =>
      service.getTagByEmail('student@student.hcmus.edu.vn'),
    sql: 'SELECT * FROM STUDITOPIA.GET_TAG_BY_EMAIL($1);',
    params: ['student@student.hcmus.edu.vn'],
    row: { id: 1, name: 'Database', num_tag: 2, num_post: 3, icon: 4, description: 'DB course' },
    expected: { id: 1, name: 'Database', num_tag: 2, num_post: 3, icon: 4, description: 'DB course' },
  },
  {
    name: 'getArea',
    call: (service: PostgresService) => service.getArea(2),
    sql: 'SELECT * FROM STUDITOPIA.GET_AREA($1);',
    params: [2],
    row: { id: 3, name: 'Campus', num_tag: 4, num_post: 5, icon: null, description: 'Campus areas' },
    expected: { id: 3, name: 'Campus', num_tag: 4, num_post: 5, icon: null, description: 'Campus areas' },
  },
  {
    name: 'getSubject',
    call: (service: PostgresService) => service.getSubject(3),
    sql: 'SELECT * FROM STUDITOPIA.GET_SUBJECT($1);',
    params: [3],
    row: { id: 4, name: 'Database', num_tag: 1, num_post: 7, icon: 2, description: 'DB course' },
    expected: { id: 4, name: 'Database', num_tag: 1, num_post: 7, icon: 2, description: 'DB course' },
  },
  {
    name: 'getRelevantTag',
    call: (service: PostgresService) => service.getRelevantTag([1, 2]),
    sql: 'SELECT * FROM STUDITOPIA.GET_RELEVANT_TAG($1);',
    params: [[1, 2]],
    row: { id: 9, name: 'Database', num_post: 7 },
    expected: { id: 9, name: 'Database', num_post: 7 },
  },
  {
    name: 'getPost',
    call: (service: PostgresService) => service.getPost([1, 2], [3]),
    sql: 'SELECT * FROM STUDITOPIA.GET_POST($1, $2);',
    params: [[1, 2], [3]],
    row: {
      id: 5,
      title: 'Midterm',
      account_id: 1,
      comment_id: 6,
      true_response: true,
      created_time: new Date('2026-01-02T00:00:00Z'),
      tags: [1, 2],
    },
    expected: {
      id: 5,
      title: 'Midterm',
      account_id: 1,
      comment_id: 6,
      true_response: true,
      created_time: new Date('2026-01-02T00:00:00Z'),
      tags: [1, 2],
    },
  },
  {
    name: 'getPostById',
    call: (service: PostgresService) => service.getPostById(5),
    sql: 'SELECT * FROM STUDITOPIA.GET_POST_BY_ID($1);',
    params: [5],
    row: {
      id: 5,
      title: 'Midterm',
      account_id: 1,
      comment_id: 6,
      true_response: false,
      created_time: new Date('2026-01-02T00:00:00Z'),
      tags: [1],
    },
    expected: {
      id: 5,
      title: 'Midterm',
      account_id: 1,
      comment_id: 6,
      true_response: false,
      created_time: new Date('2026-01-02T00:00:00Z'),
      tags: [1],
    },
  },
  {
    name: 'getComment',
    call: (service: PostgresService) => service.getComment(6),
    sql: 'SELECT * FROM STUDITOPIA.GET_COMMENT($1);',
    params: [6],
    row: {
      id: 6,
      content: 'Answer',
      account_id: 1,
      upvote: 10,
      downvote: 2,
      num_comment: 3,
      created_time: new Date('2026-01-03T00:00:00Z'),
    },
    expected: {
      id: 6,
      content: 'Answer',
      account_id: 1,
      upvote: 10,
      downvote: 2,
      num_comment: 3,
      created_time: new Date('2026-01-03T00:00:00Z'),
    },
  },
  {
    name: 'getCommentOfComment',
    call: (service: PostgresService) => service.getCommentOfComment(6),
    sql: 'SELECT * FROM STUDITOPIA.GET_COMMENT_OF_COMMENT($1);',
    params: [6],
    row: {
      id: 7,
      content: 'Reply',
      account_id: 2,
      upvote: 1,
      downvote: 0,
      num_comment: 0,
      created_time: new Date('2026-01-04T00:00:00Z'),
    },
    expected: {
      id: 7,
      content: 'Reply',
      account_id: 2,
      upvote: 1,
      downvote: 0,
      num_comment: 0,
      created_time: new Date('2026-01-04T00:00:00Z'),
    },
  },
  {
    name: 'createFile',
    call: (service: PostgresService) => service.createFile('avatar.png', 1),
    sql: 'SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);',
    params: ['avatar.png', 1],
    row: { id: 8, src: '1/8' },
    expected: { id: 8, src: '1/8' },
  },
  {
    name: 'getFileById',
    call: (service: PostgresService) => service.getFileById(8),
    sql: 'SELECT * FROM STUDITOPIA.GET_FILE_BY_ID($1);',
    params: [8],
    row: {
      id: 8,
      name: 'avatar.png',
      src: '1/8',
      account_id: 1,
      updated_time: new Date('2026-01-05T00:00:00Z'),
      created_time: new Date('2026-01-04T00:00:00Z'),
    },
    expected: {
      id: 8,
      name: 'avatar.png',
      src: '1/8',
      account_id: 1,
      updated_time: new Date('2026-01-05T00:00:00Z'),
      created_time: new Date('2026-01-04T00:00:00Z'),
    },
  },
  {
    name: 'getFileByAccount',
    call: (service: PostgresService) => service.getFileByAccount(1),
    sql: 'SELECT * FROM STUDITOPIA.GET_FILE_BY_ACCOUNT($1);',
    params: [1],
    row: {
      id: 8,
      name: 'avatar.png',
      src: '1/8',
      account_id: 1,
      updated_time: new Date('2026-01-05T00:00:00Z'),
      created_time: new Date('2026-01-04T00:00:00Z'),
    },
    expected: {
      id: 8,
      name: 'avatar.png',
      src: '1/8',
      account_id: 1,
      updated_time: new Date('2026-01-05T00:00:00Z'),
      created_time: new Date('2026-01-04T00:00:00Z'),
    },
  },
  {
    name: 'getAccountById',
    call: (service: PostgresService) => service.getAccountById(1),
    sql: 'SELECT * FROM STUDITOPIA.GET_ACCOUNT_BY_ID($1);',
    params: [1],
    row: {
      displayname: 'Student AB',
      username: 'student.ab',
      university_name: 'University A',
      university_id: 1,
      faculty_name: 'Faculty A',
      faculty_id: 2,
      major_name: 'Major A',
      major_id: 3,
      avatar: 8,
      role: 'STUDENT',
      status: 'ACTIVE',
      create_time: new Date('2026-01-01T00:00:00Z'),
    },
    expected: {
      displayname: 'Student AB',
      username: 'student.ab',
      university_name: 'University A',
      university_id: 1,
      faculty_name: 'Faculty A',
      faculty_id: 2,
      major_name: 'Major A',
      major_id: 3,
      avatar_id: 8,
      role: 'STUDENT',
      status: 'ACTIVE',
      create_time: new Date('2026-01-01T00:00:00Z'),
    },
  },
];

const scalarCases = [
  {
    name: 'createTag',
    call: (service: PostgresService) =>
      service.createTag('Database', 'subject', 'Database systems course'),
    sql: 'SELECT * FROM STUDITOPIA.CREATE_TAG($1, $2, $3);',
    params: ['Database', 'subject', 'Database systems course'],
    column: 'create_tag',
    value: 11,
  },
  {
    name: 'createPost',
    call: (service: PostgresService) =>
      service.createPost('Midterm', 'How should we prepare?', 1, [11]),
    sql: 'SELECT * FROM STUDITOPIA.CREATE_POST($1, $2, $3, $4);',
    params: ['Midterm', 'How should we prepare?', 1, [11]],
    column: 'create_post',
    value: 12,
  },
  {
    name: 'createComment',
    call: (service: PostgresService) => service.createComment(6, 'Answer', 1),
    sql: 'SELECT * FROM STUDITOPIA.CREATE_COMMENT($1, $2, $3);',
    params: [6, 'Answer', 1],
    column: 'create_comment',
    value: 13,
  },
  {
    name: 'voteComment',
    call: (service: PostgresService) => service.voteComment(13, 1),
    sql: 'SELECT * FROM STUDITOPIA.VOTE_COMMENT($1, $2, $3);',
    params: [13, 1, 0],
    column: 'vote_comment',
    value: 14,
  },
  {
    name: 'removeVote',
    call: (service: PostgresService) => service.removeVote(13, 1),
    sql: 'SELECT * FROM STUDITOPIA.REMOVE_VOTE($1, $2);',
    params: [13, 1],
    column: 'remove_vote',
    value: true,
  },
  {
    name: 'updateFile',
    call: (service: PostgresService) => service.updateFile(8, 1, 'profile.png'),
    sql: 'SELECT * FROM STUDITOPIA.UPDATE_FILE($1, $2, $3);',
    params: [8, 1, 'profile.png'],
    column: 'update_file',
    value: true,
  },
  {
    name: 'deleteFile',
    call: (service: PostgresService) => service.deleteFile(8, 1),
    sql: 'SELECT * FROM STUDITOPIA.DELETE_FILE($1, $2);',
    params: [8, 1],
    column: 'delete_file',
    value: true,
  },
  {
    name: 'setAccountAvatar',
    call: (service: PostgresService) => service.setAccountAvatar(1, 8),
    sql: 'SELECT * FROM STUDITOPIA.SET_ACCOUNT_AVATAR($1, $2);',
    params: [1, 8],
    column: 'set_account_avatar',
    value: true,
  },
  {
    name: 'setTagIcon',
    call: (service: PostgresService) => service.setTagIcon(11, 8),
    sql: 'SELECT * FROM STUDITOPIA.SET_TAG_ICON($1, $2);',
    params: [11, 8],
    column: 'set_tag_icon',
    value: true,
  },
];

const errorCases = [
  {
    name: 'createTag invalid input',
    call: (service: PostgresService) => service.createTag(' ', 'subject', ''),
    sqlstate: '22023',
    code: 22023,
  },
  {
    name: 'createPost missing account',
    call: (service: PostgresService) => service.createPost('t', 'c', 1, []),
    sqlstate: '23503',
    code: 23503,
  },
  {
    name: 'createTag duplicate',
    call: (service: PostgresService) =>
      service.createTag('Database', 'subject', 'Database systems course'),
    sqlstate: '23505',
    code: 23505,
  },
  {
    name: 'voteComment invalid type',
    call: (service: PostgresService) => service.voteComment(13, 1, 2),
    sqlstate: '23514',
    code: 23514,
  },
];

describe('Postgres database API', () => {
  let service: PostgresService;

  beforeAll(() => {
    const env = {
      get: async <T>(_name: string, _description: string, fallback: T) => fallback,
    } as unknown as EnvironmentService;
    service = new PostgresService(env);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each(rowCases)('$name maps query rows', async (testCase) => {
    const query = vi.spyOn(PoolMock, 'query').mockResolvedValue({
      rows: [testCase.row],
      rowCount: 1,
    });

    const result = await testCase.call(service);

    expect(query).toHaveBeenCalledWith(testCase.sql, testCase.params);
    expect(result).toEqual([testCase.expected]);
  });

  it.each(scalarCases)('$name maps scalar result', async (testCase) => {
    const query = vi.spyOn(PoolMock, 'query').mockResolvedValue({
      rows: [{ [testCase.column]: testCase.value }],
      rowCount: 1,
    });

    const result = await testCase.call(service);

    expect(query).toHaveBeenCalledWith(testCase.sql, testCase.params);
    expect(result).toBe(testCase.value);
  });

  it.each(errorCases)('$name maps SQLSTATE $sqlstate', async (testCase) => {
    const error = new DatabaseError('', 0, 'error');
    error.code = testCase.sqlstate;
    vi.spyOn(PoolMock, 'query').mockRejectedValue(error);

    await expect(testCase.call(service)).rejects.toEqual(testCase.code);
  });
});
