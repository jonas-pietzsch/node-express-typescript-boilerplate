export default class TestEnv {
    public static readonly local = !process.env.BASE_URL
    public static readonly baseUrl = process.env.BASE_URL || 'http://localhost:8000'
}
